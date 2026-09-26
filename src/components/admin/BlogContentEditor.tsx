'use client';

import React, { useState, useRef } from 'react';
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Quote,
  Code,
  Terminal,
  Minus,
  Table as TableIcon,
  Link as LinkIcon,
  Image as ImageIcon,
  Eye,
  Edit3,
  ChevronDown,
} from 'lucide-react';
import InternalLinkModal from './InternalLinkModal';
import MediaPickerModal from './MediaPickerModal';
import BlogContentRenderer from '../blog/BlogContentRenderer';

interface BlogContentEditorProps {
  value: string;
  onChange: (content: string) => void;
  required?: boolean;
}

export default function BlogContentEditor({
  value,
  onChange,
  required = false,
}: BlogContentEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [activeTab, setActiveTab] = useState<'write' | 'preview'>('write');
  const [linkModalOpen, setLinkModalOpen] = useState(false);
  const [mediaPickerOpen, setMediaPickerOpen] = useState(false);
  const [selectedTextForLink, setSelectedTextForLink] = useState('');
  const [headingDropdownOpen, setHeadingDropdownOpen] = useState(false);

  // Helper to insert formatting around or at cursor position
  const insertFormatting = (prefix: string, suffix: string = '', defaultText: string = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const currentText = textarea.value;
    const selected = currentText.substring(start, end) || defaultText;

    const newText =
      currentText.substring(0, start) + prefix + selected + suffix + currentText.substring(end);

    onChange(newText);

    // Reposition cursor
    setTimeout(() => {
      textarea.focus();
      const newCursor = start + prefix.length + selected.length;
      textarea.setSelectionRange(newCursor, newCursor);
    }, 10);
  };

  // Helper to insert alignment wrapper (<p align="justify">text</p>)
  const applyAlignment = (alignment: 'left' | 'center' | 'right' | 'justify') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const currentText = textarea.value;
    const selected = currentText.substring(start, end) || 'Your aligned text goes here';

    const tagStart = `<p align="${alignment}">`;
    const tagEnd = `</p>`;

    const newText =
      currentText.substring(0, start) + tagStart + selected + tagEnd + currentText.substring(end);

    onChange(newText);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + tagStart.length, start + tagStart.length + selected.length);
    }, 10);
  };

  // Helper to apply headings (H1, H2, H3, H4)
  const applyHeading = (level: 1 | 2 | 3 | 4) => {
    setHeadingDropdownOpen(false);
    const hashes = '#'.repeat(level) + ' ';
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const currentText = textarea.value;
    const selected = currentText.substring(start, end) || `Heading ${level}`;

    const newText = currentText.substring(0, start) + `${hashes}${selected}\n` + currentText.substring(end);
    onChange(newText);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + hashes.length, start + hashes.length + selected.length);
    }, 10);
  };

  // Internal Link Handler
  const handleOpenLinkModal = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      const selected = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);
      setSelectedTextForLink(selected);
    }
    setLinkModalOpen(true);
  };

  const handleInsertLinkMarkup = (markup: string) => {
    insertFormatting(markup, '', '');
  };

  // Image Insert Handler
  const handleSelectMediaImage = (imageUrl: string) => {
    const markdownImage = `\n![Image](${imageUrl})\n`;
    insertFormatting(markdownImage, '', '');
  };

  return (
    <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 transition">
      {/* Top Header Controls: Mode Toggle (Write / Preview) */}
      <div className="flex items-center justify-between px-4 py-2 bg-slate-50 border-b border-slate-200 text-xs">
        <div className="flex items-center gap-1 p-0.5 bg-slate-200/70 rounded-xl">
          <button
            type="button"
            onClick={() => setActiveTab('write')}
            className={`px-3 py-1.5 font-semibold rounded-lg flex items-center gap-1.5 transition ${
              activeTab === 'write' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Write Content</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('preview')}
            className={`px-3 py-1.5 font-semibold rounded-lg flex items-center gap-1.5 transition ${
              activeTab === 'preview' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Live Preview</span>
          </button>
        </div>

        <span className="text-[11px] text-slate-400 hidden sm:inline">
          Markdown & HTML alignment supported
        </span>
      </div>

      {activeTab === 'write' && (
        <>
          {/* Main Formatting Toolbar */}
          <div className="flex flex-wrap items-center gap-1 p-2 bg-slate-50/80 border-b border-slate-200 text-slate-700">
            {/* Headings Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setHeadingDropdownOpen(!headingDropdownOpen)}
                className="px-2.5 py-1.5 hover:bg-slate-200/70 rounded-lg flex items-center gap-1 text-xs font-semibold text-slate-700 transition"
                title="Headings (H1, H2, H3, H4)"
              >
                <span>Headings</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {headingDropdownOpen && (
                <div className="absolute left-0 mt-1 w-44 bg-white border border-slate-200 rounded-xl shadow-lg z-20 py-1 text-xs">
                  <button
                    type="button"
                    onClick={() => applyHeading(1)}
                    className="w-full px-3 py-2 text-left hover:bg-indigo-50 hover:text-indigo-600 flex items-center gap-2 font-bold text-slate-900"
                  >
                    <Heading1 className="w-4 h-4 text-indigo-600" />
                    <span>H1 - Main Heading</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => applyHeading(2)}
                    className="w-full px-3 py-2 text-left hover:bg-indigo-50 hover:text-indigo-600 flex items-center gap-2 font-semibold text-slate-800"
                  >
                    <Heading2 className="w-4 h-4 text-indigo-600" />
                    <span>H2 - Section Title</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => applyHeading(3)}
                    className="w-full px-3 py-2 text-left hover:bg-indigo-50 hover:text-indigo-600 flex items-center gap-2 font-medium text-slate-700"
                  >
                    <Heading3 className="w-4 h-4 text-indigo-600" />
                    <span>H3 - Sub-heading</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => applyHeading(4)}
                    className="w-full px-3 py-2 text-left hover:bg-indigo-50 hover:text-indigo-600 flex items-center gap-2 text-slate-600"
                  >
                    <Heading4 className="w-4 h-4 text-indigo-600" />
                    <span>H4 - Minor Heading</span>
                  </button>
                </div>
              )}
            </div>

            <div className="h-4 w-px bg-slate-300 mx-1" />

            {/* Basic Text Formatting */}
            <button
              type="button"
              onClick={() => insertFormatting('**', '**', 'bold text')}
              className="p-1.5 hover:bg-slate-200/70 rounded-lg text-slate-700 transition"
              title="Bold (**text**)"
            >
              <Bold className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => insertFormatting('*', '*', 'italic text')}
              className="p-1.5 hover:bg-slate-200/70 rounded-lg text-slate-700 transition"
              title="Italic (*text*)"
            >
              <Italic className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => insertFormatting('<u>', '</u>', 'underlined text')}
              className="p-1.5 hover:bg-slate-200/70 rounded-lg text-slate-700 transition"
              title="Underline (<u>text</u>)"
            >
              <Underline className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => insertFormatting('~~', '~~', 'strikethrough text')}
              className="p-1.5 hover:bg-slate-200/70 rounded-lg text-slate-700 transition"
              title="Strikethrough (~~text~~)"
            >
              <Strikethrough className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => insertFormatting('`', '`', 'code')}
              className="p-1.5 hover:bg-slate-200/70 rounded-lg text-slate-700 transition"
              title="Inline Code"
            >
              <Code className="w-4 h-4" />
            </button>

            <div className="h-4 w-px bg-slate-300 mx-1" />

            {/* Alignment Options (Left, Center, Right, Justify) */}
            <button
              type="button"
              onClick={() => applyAlignment('left')}
              className="p-1.5 hover:bg-slate-200/70 rounded-lg text-slate-700 transition"
              title="Align Left (<p align='left'>)"
            >
              <AlignLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => applyAlignment('center')}
              className="p-1.5 hover:bg-slate-200/70 rounded-lg text-slate-700 transition"
              title="Align Center (<p align='center'>)"
            >
              <AlignCenter className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => applyAlignment('right')}
              className="p-1.5 hover:bg-slate-200/70 rounded-lg text-slate-700 transition"
              title="Align Right (<p align='right'>)"
            >
              <AlignRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => applyAlignment('justify')}
              className="p-1.5 hover:bg-indigo-100 text-indigo-700 rounded-lg font-bold transition"
              title="Align Justify (<p align='justify'>)"
            >
              <AlignJustify className="w-4 h-4" />
            </button>

            <div className="h-4 w-px bg-slate-300 mx-1" />

            {/* Lists & Blocks */}
            <button
              type="button"
              onClick={() => insertFormatting('\n- ', '', 'List item')}
              className="p-1.5 hover:bg-slate-200/70 rounded-lg text-slate-700 transition"
              title="Bullet List (- item)"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => insertFormatting('\n1. ', '', 'Numbered item')}
              className="p-1.5 hover:bg-slate-200/70 rounded-lg text-slate-700 transition"
              title="Numbered List (1. item)"
            >
              <ListOrdered className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => insertFormatting('\n> ', '', 'Quote text')}
              className="p-1.5 hover:bg-slate-200/70 rounded-lg text-slate-700 transition"
              title="Blockquote (> text)"
            >
              <Quote className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => insertFormatting('\n```javascript\n', '\n```\n', '// code here')}
              className="p-1.5 hover:bg-slate-200/70 rounded-lg text-slate-700 transition"
              title="Code Block (``` code ```)"
            >
              <Terminal className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => insertFormatting('\n---\n', '', '')}
              className="p-1.5 hover:bg-slate-200/70 rounded-lg text-slate-700 transition"
              title="Horizontal Divider (---)"
            >
              <Minus className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() =>
                insertFormatting(
                  '\n| Header 1 | Header 2 |\n| --- | --- |\n| Cell 1 | Cell 2 |\n',
                  '',
                  ''
                )
              }
              className="p-1.5 hover:bg-slate-200/70 rounded-lg text-slate-700 transition"
              title="Insert Table"
            >
              <TableIcon className="w-4 h-4" />
            </button>

            <div className="h-4 w-px bg-slate-300 mx-1" />

            {/* Link & Media Options */}
            <button
              type="button"
              onClick={handleOpenLinkModal}
              className="px-2 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg text-xs font-semibold flex items-center gap-1 transition"
              title="Internal & External Link Picker"
            >
              <LinkIcon className="w-3.5 h-3.5" />
              <span>Internal Link</span>
            </button>
            <button
              type="button"
              onClick={() => setMediaPickerOpen(true)}
              className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1 transition"
              title="Insert Image from Media Library"
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Image</span>
            </button>
          </div>

          {/* Content Textarea */}
          <textarea
            ref={textareaRef}
            rows={12}
            required={required}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Write article content using markdown or toolbar options (H1/H2/H3, internal links, justified text, bold, etc.)..."
            className="w-full p-4 text-sm bg-white focus:outline-none font-mono leading-relaxed min-h-[300px] resize-y text-slate-800"
          />
        </>
      )}

      {/* Live Preview Tab */}
      {activeTab === 'preview' && (
        <div className="p-6 bg-slate-50/50 min-h-[350px] overflow-y-auto">
          {value.trim() ? (
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
              <BlogContentRenderer content={value} />
            </div>
          ) : (
            <div className="text-center py-16 text-slate-400 text-sm">
              No content entered yet. Switch to "Write Content" tab to write your post.
            </div>
          )}
        </div>
      )}

      {/* Internal Link Picker Modal */}
      <InternalLinkModal
        isOpen={linkModalOpen}
        onClose={() => setLinkModalOpen(false)}
        onInsertLink={handleInsertLinkMarkup}
        selectedText={selectedTextForLink}
      />

      {/* Media Picker Modal for Images */}
      <MediaPickerModal
        isOpen={mediaPickerOpen}
        onClose={() => setMediaPickerOpen(false)}
        onSelect={handleSelectMediaImage}
        title="Select Image to Insert into Blog Content"
      />
    </div>
  );
}
