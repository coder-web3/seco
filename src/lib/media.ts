import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { prisma } from './prisma';

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');
const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/avif',
  'image/gif',
  'image/svg+xml',
];
const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif', '.svg'];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

// Ensure uploads directory exists
export function ensureUploadDir() {
  if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  }
}

export interface UploadResult {
  id: number;
  originalName: string;
  fileName: string;
  fileUrl: string;
  mimeType: string;
  fileSize: number;
}

export async function saveMediaFile(
  fileBuffer: Buffer,
  originalFilename: string,
  mimeType: string,
  altText?: string
): Promise<UploadResult> {
  // Validate MIME type
  if (!ALLOWED_MIME_TYPES.includes(mimeType)) {
    throw new Error(`Unsupported file type: ${mimeType}. Allowed types: JPEG, PNG, WEBP, AVIF, GIF, SVG.`);
  }

  // Validate File Size
  if (fileBuffer.length > MAX_FILE_SIZE) {
    throw new Error(`File size exceeds limit of 10MB.`);
  }

  // Validate Extension
  const ext = path.extname(originalFilename).toLowerCase();
  if (!ALLOWED_EXTENSIONS.includes(ext)) {
    throw new Error(`Invalid file extension: ${ext}`);
  }

  ensureUploadDir();

  // Generate safe unique filename
  const randomHash = crypto.randomBytes(8).toString('hex');
  const safeBaseName = path
    .basename(originalFilename, ext)
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .substring(0, 30);
  const uniqueFileName = `${Date.now()}-${safeBaseName || 'file'}-${randomHash}${ext}`;
  const diskPath = path.join(UPLOAD_DIR, uniqueFileName);

  // Write file to public/uploads
  fs.writeFileSync(diskPath, fileBuffer);

  const fileUrl = `/uploads/${uniqueFileName}`;

  // Save metadata to database
  const mediaRecord = await prisma.mediaFile.create({
    data: {
      originalName: originalFilename,
      fileName: uniqueFileName,
      filePath: diskPath,
      fileUrl,
      mimeType,
      fileSize: fileBuffer.length,
      altText: altText || originalFilename,
    },
  });

  return {
    id: mediaRecord.id,
    originalName: mediaRecord.originalName,
    fileName: mediaRecord.fileName,
    fileUrl: mediaRecord.fileUrl,
    mimeType: mediaRecord.mimeType,
    fileSize: mediaRecord.fileSize,
  };
}

export async function deleteMediaFile(id: number): Promise<boolean> {
  const media = await prisma.mediaFile.findUnique({
    where: { id },
  });

  if (!media) return false;

  // Remove from disk if exists
  try {
    if (fs.existsSync(media.filePath)) {
      fs.unlinkSync(media.filePath);
    }
  } catch (err) {
    console.error('Error removing file from disk:', err);
  }

  // Remove from database
  await prisma.mediaFile.delete({
    where: { id },
  });

  return true;
}
