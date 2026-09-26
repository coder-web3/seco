'use client';

import React from 'react';
import Link from 'next/link';

interface BlogContentRendererProps {
  content: string;
}

export default function BlogContentRenderer({ content }: BlogContentRendererProps) {
  if (!content) return null;

  // Process block elements and html tags
  const renderFormattedContent = (rawText: string) => {
    // Standardize line breaks
    const lines = rawText.split(/\r?\n/);
    const elements: React.ReactNode[] = [];
    let listBuffer: { type: 'ul' | 'ol'; items: string[] } | null = null;
    let codeBuffer: { language: string; lines: string[] } | null = null;

    const flushList = (keyPrefix: string) => {
      if (!listBuffer) return null;
      const { type, items } = listBuffer;
      listBuffer = null;

      if (type === 'ul') {
        return (
          <ul key={keyPrefix} className="list-disc list-inside space-y-1 my-4 text-slate-700 pl-4">
            {items.map((it, idx) => (
              <li key={idx}>{parseInlineText(it)}</li>
            ))}
          </ul>
        );
      } else {
        return (
          <ol key={keyPrefix} className="list-decimal list-inside space-y-1 my-4 text-slate-700 pl-4">
            {items.map((it, idx) => (
              <li key={idx}>{parseInlineText(it)}</li>
            ))}
          </ol>
        );
      }
    };

    const flushCode = (keyPrefix: string) => {
      if (!codeBuffer) return null;
      const codeText = codeBuffer.lines.join('\n');
      codeBuffer = null;
      return (
        <pre key={keyPrefix} className="bg-slate-900 text-slate-100 p-4 rounded-xl overflow-x-auto text-sm font-mono my-4">
          <code>{codeText}</code>
        </pre>
      );
    };

    lines.forEach((line, i) => {
      const lineKey = `line-${i}`;

      // Code Block backticks
      if (line.trim().startsWith('```')) {
        if (codeBuffer) {
          elements.push(flushCode(lineKey));
        } else {
          if (listBuffer) elements.push(flushList(`list-${i}`));
          codeBuffer = { language: line.trim().replace('```', ''), lines: [] };
        }
        return;
      }

      if (codeBuffer) {
        codeBuffer.lines.push(line);
        return;
      }

      // Check for bullet or numbered list
      const ulMatch = line.match(/^(\s*)[-*+]\s+(.*)$/);
      const olMatch = line.match(/^(\s*)\d+\.\s+(.*)$/);

      if (ulMatch) {
        if (listBuffer && listBuffer.type !== 'ul') {
          elements.push(flushList(`list-${i}`));
        }
        if (!listBuffer) listBuffer = { type: 'ul', items: [] };
        listBuffer.items.push(ulMatch[2]);
        return;
      }

      if (olMatch) {
        if (listBuffer && listBuffer.type !== 'ol') {
          elements.push(flushList(`list-${i}`));
        }
        if (!listBuffer) listBuffer = { type: 'ol', items: [] };
        listBuffer.items.push(olMatch[2]);
        return;
      }

      // Flush any pending list before normal blocks
      if (listBuffer) {
        elements.push(flushList(`list-${i}`));
      }

      const trimmed = line.trim();

      // Empty line
      if (!trimmed) {
        return;
      }

      // Horizontal Rule
      if (/^(---|\*\*\*|___)$/.test(trimmed)) {
        elements.push(<hr key={lineKey} className="my-8 border-slate-200" />);
        return;
      }

      // HTML Headings H1, H2, H3, H4 or Markdown #, ##, ###, ####
      if (/^<h1[^>]*>(.*?)<\/h1>$/i.test(trimmed) || /^#\s+(.*)$/.test(trimmed)) {
        const text = trimmed.replace(/^<h1[^>]*>|<\/h1>$|^#\s+/gi, '');
        elements.push(
          <h1 key={lineKey} className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-8 mb-4 tracking-tight leading-tight">
            {parseInlineText(text)}
          </h1>
        );
        return;
      }

      if (/^<h2[^>]*>(.*?)<\/h2>$/i.test(trimmed) || /^##\s+(.*)$/.test(trimmed)) {
        const text = trimmed.replace(/^<h2[^>]*>|<\/h2>$|^##\s+/gi, '');
        elements.push(
          <h2 key={lineKey} className="text-2xl sm:text-3xl font-bold text-slate-900 mt-7 mb-3 tracking-tight">
            {parseInlineText(text)}
          </h2>
        );
        return;
      }

      if (/^<h3[^>]*>(.*?)<\/h3>$/i.test(trimmed) || /^###\s+(.*)$/.test(trimmed)) {
        const text = trimmed.replace(/^<h3[^>]*>|<\/h3>$|^###\s+/gi, '');
        elements.push(
          <h3 key={lineKey} className="text-xl sm:text-2xl font-bold text-slate-900 mt-6 mb-2">
            {parseInlineText(text)}
          </h3>
        );
        return;
      }

      if (/^<h4[^>]*>(.*?)<\/h4>$/i.test(trimmed) || /^####\s+(.*)$/.test(trimmed)) {
        const text = trimmed.replace(/^<h4[^>]*>|<\/h4>$|^####\s+/gi, '');
        elements.push(
          <h4 key={lineKey} className="text-lg font-bold text-slate-900 mt-5 mb-2">
            {parseInlineText(text)}
          </h4>
        );
        return;
      }

      // Blockquote
      if (trimmed.startsWith('>')) {
        const quoteText = trimmed.replace(/^>\s?/, '');
        elements.push(
          <blockquote key={lineKey} className="border-l-4 border-indigo-600 pl-4 py-2 my-4 italic text-slate-700 bg-indigo-50/40 rounded-r-xl">
            {parseInlineText(quoteText)}
          </blockquote>
        );
        return;
      }

      // HTML Alignment Wrapper detection (<p align="justify">, <div align="center">, etc.)
      const alignMatch = trimmed.match(/^<(p|div)\s+(?:align|style)=["']?(?:text-align:\s*)?(justify|center|right|left)["']?[^>]*>(.*?)<\/\1>$/i);
      if (alignMatch) {
        const alignType = alignMatch[2].toLowerCase();
        const innerText = alignMatch[3];
        let alignClass = 'text-left';
        if (alignType === 'justify') alignClass = 'text-justify';
        else if (alignType === 'center') alignClass = 'text-center';
        else if (alignType === 'right') alignClass = 'text-right';

        elements.push(
          <p key={lineKey} className={`${alignClass} text-slate-800 leading-relaxed my-3`}>
            {parseInlineText(innerText)}
          </p>
        );
        return;
      }

      // Default paragraph
      elements.push(
        <p key={lineKey} className="text-slate-800 leading-relaxed my-3">
          {parseInlineText(line)}
        </p>
      );
    });

    if (listBuffer) elements.push(flushList('list-end'));
    if (codeBuffer) elements.push(flushCode('code-end'));

    return elements;
  };

  // Inline formatting helper for links, bold, italic, underline, strikethrough, images
  const parseInlineText = (text: string): React.ReactNode[] => {
    if (!text) return [];

    // Regex to match Markdown/HTML links, images, bold, italic, underline, strikethrough
    // 1. Image: ![alt](url)
    // 2. Link markdown: [anchor](url)
    // 3. Link html: <a href="url">anchor</a>
    // 4. Bold: **text** or <b>text</b> or <strong>text</strong>
    // 5. Italic: *text* or <i>text</i> or <em>text</em>
    // 6. Underline: <u>text</u>
    // 7. Strikethrough: ~~text~~ or <del>text</del>

    // Simple parser tokenization
    const result: React.ReactNode[] = [];
    let remaining = text;
    let key = 0;

    while (remaining.length > 0) {
      // Image: ![alt](src)
      const imgMatch = remaining.match(/^!\[(.*?)\]\((.*?)\)/);
      if (imgMatch) {
        const alt = imgMatch[1];
        const src = imgMatch[2];
        result.push(
          <span key={key++} className="block my-6">
            <img src={src} alt={alt} className="max-w-full h-auto rounded-2xl border border-slate-200 shadow-md mx-auto" />
            {alt && <span className="block text-center text-xs text-slate-500 mt-2 font-medium">{alt}</span>}
          </span>
        );
        remaining = remaining.slice(imgMatch[0].length);
        continue;
      }

      // Markdown Link: [text](url)
      const mdLinkMatch = remaining.match(/^\[(.*?)\]\((.*?)\)/);
      if (mdLinkMatch) {
        const label = mdLinkMatch[1];
        const url = mdLinkMatch[2];
        const isInternal = url.startsWith('/') || url.startsWith('#');

        if (isInternal) {
          result.push(
            <Link key={key++} href={url} className="text-indigo-600 hover:text-indigo-800 font-semibold underline underline-offset-2 transition">
              {label}
            </Link>
          );
        } else {
          result.push(
            <a
              key={key++}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-800 font-semibold underline underline-offset-2 transition"
            >
              {label}
            </a>
          );
        }
        remaining = remaining.slice(mdLinkMatch[0].length);
        continue;
      }

      // HTML Link: <a href="url">text</a>
      const htmlLinkMatch = remaining.match(/^<a\s+[^>]*href=["']([^"']+)["'][^>]*>(.*?)<\/a>/i);
      if (htmlLinkMatch) {
        const url = htmlLinkMatch[1];
        const label = htmlLinkMatch[2];
        const isInternal = url.startsWith('/') || url.startsWith('#');

        if (isInternal) {
          result.push(
            <Link key={key++} href={url} className="text-indigo-600 hover:text-indigo-800 font-semibold underline underline-offset-2 transition">
              {parseInlineText(label)}
            </Link>
          );
        } else {
          result.push(
            <a
              key={key++}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-800 font-semibold underline underline-offset-2 transition"
            >
              {parseInlineText(label)}
            </a>
          );
        }
        remaining = remaining.slice(htmlLinkMatch[0].length);
        continue;
      }

      // Bold: **text**
      const boldMatch = remaining.match(/^(\*\*|<b>|<strong>)(.*?)(?:\*\*|<\/b>|<\/strong>)/i);
      if (boldMatch) {
        result.push(<strong key={key++} className="font-bold text-slate-900">{boldMatch[2]}</strong>);
        remaining = remaining.slice(boldMatch[0].length);
        continue;
      }

      // Italic: *text* or <em>
      const italicMatch = remaining.match(/^(\*|<i>|<em>)(.*?)(?:\*|<\/i>|<\/em>)/i);
      if (italicMatch) {
        result.push(<em key={key++} className="italic">{italicMatch[2]}</em>);
        remaining = remaining.slice(italicMatch[0].length);
        continue;
      }

      // Underline: <u>text</u>
      const underlineMatch = remaining.match(/^<u>(.*?)<\/u>/i);
      if (underlineMatch) {
        result.push(<u key={key++} className="underline">{underlineMatch[1]}</u>);
        remaining = remaining.slice(underlineMatch[0].length);
        continue;
      }

      // Strikethrough: ~~text~~
      const strikeMatch = remaining.match(/^(~~|<del>)(.*?)(?:~~|<\/del>)/i);
      if (strikeMatch) {
        result.push(<del key={key++} className="line-through">{strikeMatch[2]}</del>);
        remaining = remaining.slice(strikeMatch[0].length);
        continue;
      }

      // Next plain text chunk up to next special character
      const nextSpecial = remaining.search(/[!\[<*~]/);
      if (nextSpecial === -1) {
        result.push(remaining);
        break;
      } else if (nextSpecial === 0) {
        // Character wasn't matched by pattern, output it as literal text
        result.push(remaining[0]);
        remaining = remaining.slice(1);
      } else {
        result.push(remaining.slice(0, nextSpecial));
        remaining = remaining.slice(nextSpecial);
      }
    }

    return result;
  };

  return <div className="blog-content-prose space-y-4 text-slate-800">{renderFormattedContent(content)}</div>;
}
