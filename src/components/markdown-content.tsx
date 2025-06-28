'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Image from 'next/image';

interface MarkdownContentProps {
  content: string;
  compact?: boolean;
}

export function MarkdownContent({ content, compact = false }: MarkdownContentProps) {
  return (
    <div className={compact ? "prose max-w-none" : "prose prose-lg max-w-none"}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Custom styling for markdown elements
          h1: ({ children }) => (
            <h1 className={compact 
              ? "text-xl font-bold text-[#273572] mt-4 mb-2" 
              : "text-3xl font-bold text-[#273572] mt-8 mb-4"}>{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className={compact 
              ? "text-lg font-semibold text-[#273572] mt-3 mb-1.5" 
              : "text-2xl font-semibold text-[#273572] mt-6 mb-3"}>{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className={compact 
              ? "text-base font-medium text-[#273572] mt-2 mb-1" 
              : "text-xl font-medium text-[#273572] mt-4 mb-2"}>{children}</h3>
          ),
          p: ({ children }) => (
            <p className={compact 
              ? "text-gray-700 leading-normal mb-2" 
              : "text-gray-700 leading-relaxed mb-4"}>{children}</p>
          ),
          ul: ({ children }) => (
            <ul className={compact 
              ? "list-disc list-inside space-y-1 mb-2" 
              : "list-disc list-inside space-y-2 mb-4"}>{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className={compact 
              ? "list-decimal list-inside space-y-1 mb-2" 
              : "list-decimal list-inside space-y-2 mb-4"}>{children}</ol>
          ),
          li: ({ children }) => (
            <li className="text-gray-700">{children}</li>
          ),
          blockquote: ({ children }) => (
            <blockquote className={compact 
              ? "border-l-2 border-blue-200 pl-2 italic text-gray-600 my-2"
              : "border-l-4 border-blue-200 pl-4 italic text-gray-600 my-4"}>
              {children}
            </blockquote>
          ),
          code: ({ children, className }) => {
            const isInline = !className;
            if (isInline) {
              return (
                <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">
                  {children}
                </code>
              );
            }
            return (
              <code className="block bg-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono">
                {children}
              </code>
            );
          },
          img: ({ src, alt }) => {
            if (!src) return null;
            
            let imageSrc = src;
            if (!src.startsWith('http') && !src.startsWith('/api/storage/')) {
              imageSrc = `/api/storage/${src}`;
            }
            
            return (
              <span className={compact ? "block my-2" : "block my-6"}>
                <Image
                  src={imageSrc}
                  alt={alt || ""}
                  width={compact ? 400 : 800}
                  height={compact ? 200 : 400}
                  className="rounded-lg object-cover w-full h-auto max-w-full"
                  style={{ maxHeight: compact ? '250px' : '500px' }}
                  priority={false}
                  unoptimized={true}
                  onError={(e) => {
                    console.error('Image load error:', e);
                    console.error('Failed image src:', imageSrc);
                  }}
                />
                {alt && (
                  <span className={compact 
                    ? "block text-xs text-gray-500 mt-1 text-center italic"
                    : "block text-sm text-gray-500 mt-2 text-center italic"}>
                    {alt}
                  </span>
                )}
              </span>
            );
          },
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-blue-600 hover:text-blue-800 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
} 