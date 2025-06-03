"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { CMSLayout } from "@/components/cms/layout/cms-layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2, Save, Image as ImageIcon } from "lucide-react";

// Form validation schema
const formSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  slug: z
    .string()
    .min(3, { message: "Slug must be at least 3 characters" })
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      message: "Slug must contain only lowercase letters, numbers, and hyphens",
    }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  content: z.string().min(50, { message: "Content must be at least 50 characters" }),
  status: z.enum(["draft", "published"]),
  image: z.string().optional(),
  imageStorageId: z.string().optional(),
});

export default function NewPostPage() {
  const router = useRouter();
  const { toast } = useToast();
  const createPost = useMutation(api.posts.createPost);
  const generateUploadUrl = useMutation(api.http.generateUploadUrl);
  const [isUploading, setIsUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Set up form with validation
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      slug: "",
      description: "",
      content: "",
      status: "draft",
      image: undefined,
      imageStorageId: undefined,
    },
  });

  const { isSubmitting } = form.formState;

  // Generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  // Handle title change to auto-generate slug
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    form.setValue("title", title);

    // Only auto-generate slug if it hasn't been manually edited or is empty
    const currentSlug = form.getValues("slug");
    if (!currentSlug) {
      const newSlug = generateSlug(title);
      form.setValue("slug", newSlug);
    }
  };

  // Handle image upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type and size
    if (!file.type.includes("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Image must be less than 5MB",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsUploading(true);

      // Generate a Convex upload URL
      const postUrl = await generateUploadUrl();

      // Upload the file to Convex storage
      const result = await fetch(postUrl, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });

      if (!result.ok) {
        throw new Error(`Error uploading image: ${result.statusText}`);
      }

      const { storageId } = await result.json();

      // Create a URL for previewing the image
      const imageUrl = `${window.location.protocol}//${window.location.host}/api/storage/${storageId}`;
      
      // Update form values with image data
      form.setValue("image", imageUrl);
      form.setValue("imageStorageId", storageId);
      setPreviewImage(imageUrl);

      toast({
        title: "Image uploaded",
        description: "Your image has been uploaded successfully",
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
  };

  // Handle form submission
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // Create the post in Convex
      await createPost({
        title: values.title,
        slug: values.slug,
        description: values.description,
        content: values.content,
        status: values.status as "draft" | "published",
        image: values.image,
        imageStorageId: values.imageStorageId as any,
      });

      toast({
        title: "Post created",
        description: `Your post has been successfully ${
          values.status === "published" ? "published" : "saved as a draft"
        }.`,
      });

      // Navigate back to posts list
      router.push("/cms/posts");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create post. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <CMSLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Create New Post</h1>
          <Button variant="outline" onClick={() => router.push("/cms/posts")}>
            Cancel
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Post Details</CardTitle>
            <CardDescription>
              Create a new post for your website
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Title field */}
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter post title"
                          {...field}
                          onChange={handleTitleChange}
                        />
                      </FormControl>
                      <FormDescription>
                        The title of your post as it will appear on the website
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Slug field */}
                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slug</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="enter-post-slug"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        The URL-friendly version of the title (auto-generated but can be edited)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Description field */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Brief description of the post"
                          {...field}
                          rows={2}
                        />
                      </FormControl>
                      <FormDescription>
                        A short summary that appears in post listings
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Status field */}
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select post status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="published">Published</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Published posts are visible on the website, drafts are only visible in the CMS
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Image upload */}
                <div className="space-y-2">
                  <FormLabel>Featured Image</FormLabel>
                  <div className="border rounded-md p-4">
                    {previewImage ? (
                      <div className="space-y-2">
                        <div className="aspect-video bg-gray-100 rounded-md overflow-hidden relative">
                          <img
                            src={previewImage}
                            alt="Post preview"
                            className="w-full h-full object-cover"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            className="absolute top-2 right-2"
                            onClick={() => {
                              setPreviewImage(null);
                              form.setValue("image", undefined);
                              form.setValue("imageStorageId", undefined);
                            }}
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-48 bg-gray-50 rounded-md border-dashed border-2 border-gray-200">
                        <div className="text-center">
                          <ImageIcon className="mx-auto h-10 w-10 text-gray-400" />
                          <div className="mt-2">
                            <label
                              htmlFor="image-upload"
                              className="relative cursor-pointer rounded-md font-medium text-[#396CB1] focus-within:outline-none"
                            >
                              <span>
                                {isUploading ? "Uploading..." : "Upload an image"}
                              </span>
                              <input
                                id="image-upload"
                                name="image-upload"
                                type="file"
                                accept="image/*"
                                className="sr-only"
                                onChange={handleImageUpload}
                                disabled={isUploading}
                              />
                            </label>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            PNG, JPG, GIF up to 5MB
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Content field */}
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Content</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Write your post content here..."
                          {...field}
                          rows={12}
                          className="font-mono text-sm"
                        />
                      </FormControl>
                      <FormDescription>
                        The main content of your post. Supports markdown formatting.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit button */}
                <div className="flex justify-end">
                  <Button
                    type="submit"
                    disabled={isSubmitting || isUploading}
                    className="min-w-32"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Post
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </CMSLayout>
  );
} 