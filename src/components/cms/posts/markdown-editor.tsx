"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, Edit, FileText, Clock } from "lucide-react";

// Dynamically import MDEditor to avoid SSR issues
const MDEditor = dynamic(
  () => import("@uiw/react-md-editor").then((mod) => mod.default),
  { ssr: false }
);

const MDPreview = dynamic(
  () => import("@uiw/react-md-editor").then((mod) => mod.default.Markdown),
  { ssr: false }
);

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  height?: number;
  showStats?: boolean;
}

// Helper function to calculate word count
function calculateWordCount(text: string): number {
  return text.trim().split(/\s+/).filter(word => word.length > 0).length;
}

// Helper function to calculate reading time (average 200 words per minute)
function calculateReadingTime(wordCount: number): number {
  return Math.ceil(wordCount / 200);
}

// Helper function to generate excerpt
function generateExcerpt(content: string, maxLength: number = 160): string {
  const plainText = content
    .replace(/#{1,6}\s+/g, '') // Remove headers
    .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
    .replace(/\*(.*?)\*/g, '$1') // Remove italic
    .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Remove links, keep text
    .replace(/`(.*?)`/g, '$1') // Remove inline code
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/\n+/g, ' ') // Replace newlines with spaces
    .trim();
  
  if (plainText.length <= maxLength) {
    return plainText;
  }
  
  return plainText.substring(0, maxLength).replace(/\s+\S*$/, '') + '...';
}

export function MarkdownEditor({
  value,
  onChange,
  placeholder = "Write your content in markdown...",
  label = "Content",
  error,
  height = 400,
  showStats = true,
}: MarkdownEditorProps) {
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");
  const [stats, setStats] = useState({
    wordCount: 0,
    readingTime: 0,
    excerpt: "",
  });

  // Update stats when content changes
  useEffect(() => {
    if (value) {
      const wordCount = calculateWordCount(value);
      const readingTime = calculateReadingTime(wordCount);
      const excerpt = generateExcerpt(value);
      
      setStats({
        wordCount,
        readingTime,
        excerpt,
      });
    } else {
      setStats({
        wordCount: 0,
        readingTime: 0,
        excerpt: "",
      });
    }
  }, [value]);

  return (
    <div className="space-y-4">
      {label && (
        <Label className="text-sm font-medium text-gray-700">{label}</Label>
      )}
      
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "edit" | "preview")}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="edit" className="flex items-center gap-2">
            <Edit className="h-4 w-4" />
            Edit
          </TabsTrigger>
          <TabsTrigger value="preview" className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            Preview
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="edit" className="mt-4">
          <div className="border rounded-lg overflow-hidden">
            <MDEditor
              value={value}
              onChange={(val) => onChange(val || "")}
              height={height}
              preview="edit"
              hideToolbar={false}
              visibleDragbar={false}
              data-color-mode="light"
              textareaProps={{
                placeholder,
                style: {
                  fontSize: 14,
                  lineHeight: 1.5,
                  fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                },
              }}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="preview" className="mt-4">
          <div 
            className="border rounded-lg p-4 min-h-[400px] bg-white prose prose-sm max-w-none"
            style={{ height: `${height}px`, overflow: 'auto' }}
          >
            {value ? (
              <MDPreview source={value} />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                <div className="text-center">
                  <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No content to preview</p>
                  <p className="text-sm">Switch to Edit tab to start writing</p>
                </div>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}

      {showStats && value && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Content Statistics
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="flex items-center gap-1">
                  <FileText className="h-3 w-3" />
                  {stats.wordCount} words
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {stats.readingTime} min read
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  Characters: {value.length}
                </Badge>
              </div>
            </div>
            
            {stats.excerpt && (
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-xs font-medium text-gray-700 mb-1">Auto-generated excerpt:</p>
                <p className="text-sm text-gray-600">{stats.excerpt}</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
} 