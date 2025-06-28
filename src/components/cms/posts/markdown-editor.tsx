"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import dynamic from "next/dynamic";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Eye, Edit, FileText, Clock, Upload, Image as ImageIcon, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

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
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [stats, setStats] = useState({
    wordCount: 0,
    readingTime: 0,
    excerpt: "",
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const generateUploadUrl = useMutation(api.http.generateUploadUrl);
  const { toast } = useToast();

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

  // Handle image upload
  const uploadImage = useCallback(async (file: File) => {
    if (!file.type.includes('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      toast({
        title: "File too large",
        description: "Image must be less than 5MB",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsUploading(true);

      // Generate upload URL
      const postUrl = await generateUploadUrl();

      // Upload file to Convex storage
      const result = await fetch(postUrl, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });

      if (!result.ok) {
        throw new Error(`Upload failed: ${result.statusText}`);
      }

      const { storageId } = await result.json();

      // Use the API storage route for the image URL
      const imageUrl = `/api/storage/${storageId}`;

      // Generate markdown for the image
      const altText = file.name.replace(/\.[^/.]+$/, ""); // Remove extension
      const markdownImage = `![${altText}](${imageUrl})`;

      // Insert the markdown image at the current cursor position
      const textarea = document.querySelector('textarea[placeholder*="markdown"]') as HTMLTextAreaElement;
      if (textarea) {
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const newContent = value.substring(0, start) + markdownImage + value.substring(end);
        onChange(newContent);
        
        // Set cursor position after the inserted image
        setTimeout(() => {
          textarea.setSelectionRange(start + markdownImage.length, start + markdownImage.length);
          textarea.focus();
        }, 10);
      } else {
        // Fallback: append to end
        onChange(value + '\n\n' + markdownImage);
      }

      toast({
        title: "Image uploaded",
        description: "Image has been uploaded and inserted into your content",
      });

    } catch (error) {
      console.error("Error uploading image:", error);
      toast({
        title: "Upload failed",
        description: "There was an error uploading your image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  }, [generateUploadUrl, onChange, value, toast]);

  // Handle file selection
  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadImage(file);
    }
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [uploadImage]);

  // Handle drag and drop
  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    const imageFile = files.find(file => file.type.includes('image/'));
    
    if (imageFile) {
      uploadImage(imageFile);
    } else if (files.length > 0) {
      toast({
        title: "Invalid file type",
        description: "Please drop an image file",
        variant: "destructive",
      });
    }
  }, [uploadImage, toast]);

  return (
    <div className="space-y-4">
      {label && (
        <Label className="text-sm font-medium text-gray-700">{label}</Label>
      )}
      
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "edit" | "preview")}>
        <div className="flex items-center justify-between">
          <TabsList className="grid w-full max-w-sm grid-cols-2">
            <TabsTrigger value="edit" className="flex items-center gap-2">
              <Edit className="h-4 w-4" />
              Edit
            </TabsTrigger>
            <TabsTrigger value="preview" className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Preview
            </TabsTrigger>
          </TabsList>
          
          <div className="flex items-center gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="flex items-center gap-2"
            >
              {isUploading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <ImageIcon className="h-4 w-4" />
              )}
              {isUploading ? "Uploading..." : "Add Image"}
            </Button>
          </div>
        </div>
        
        <TabsContent value="edit" className="mt-4">
          <div 
            className={`border rounded-lg overflow-hidden relative ${dragActive ? 'border-blue-500 bg-blue-50' : ''}`}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            {dragActive && (
              <div className="absolute inset-0 bg-blue-100 bg-opacity-80 flex items-center justify-center z-10 rounded-lg">
                <div className="text-center">
                  <Upload className="h-12 w-12 text-blue-500 mx-auto mb-2" />
                  <p className="text-blue-700 font-medium">Drop image here to upload</p>
                </div>
              </div>
            )}
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
              <MDPreview 
                source={value}
                components={{
                  img: ({ src, alt, ...props }) => {
                    // Handle Convex storage URLs properly
                    if (src?.startsWith('/api/storage/')) {
                      return (
                        <img
                          src={src}
                          alt={alt}
                          className="max-w-full h-auto rounded-lg"
                          loading="lazy"
                          {...props}
                        />
                      );
                    }
                    return (
                      <img
                        src={src}
                        alt={alt}
                        className="max-w-full h-auto rounded-lg"
                        loading="lazy"
                        {...props}
                      />
                    );
                  },
                }}
              />
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
      
      {/* Instructions for users */}
      <Card className="bg-blue-50">
        <CardContent className="p-4">
          <div className="text-sm text-blue-700">
            <p className="font-medium mb-1">💡 Pro Tips:</p>
            <ul className="list-disc list-inside space-y-1 text-xs">
              <li>Drag and drop images directly into the editor</li>
              <li>Use **bold** and *italic* formatting</li>
              <li>Create headers with # ## ### etc.</li>
              <li>Add links with [text](url) format</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 