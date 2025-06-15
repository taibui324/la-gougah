"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../../../convex/_generated/api";
import { Id } from "../../../../../../convex/_generated/dataModel";
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
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2, Save, Image as ImageIcon } from "lucide-react";
import { MarkdownEditor } from "@/components/cms/posts/markdown-editor";

// Form validation schema
const formSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  slug: z
    .string()
    .min(3, { message: "Slug must be at least 3 characters" })
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      message: "Slug must contain only lowercase letters, numbers, and hyphens",
    }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" }),
  content: z
    .string()
    .min(50, { message: "Content must be at least 50 characters" }),
  status: z.enum(["draft", "published", "archived"]),
  image: z.string().optional(),
  imageStorageId: z.string().optional(),
});

export default function EditPostPage({
  params,
}: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { toast } = useToast();

  // Handle Next.js 15 async params
  const [postId, setPostId] = useState<Id<"posts"> | null>(null);

  useEffect(() => {
    const resolveParams = async () => {
      const resolvedParams = await params;
      setPostId(resolvedParams.id as Id<"posts">);
    };
    resolveParams();
  }, [params]);

  // Fetch post data
  const post = useQuery(
    api.posts.getPostById,
    postId ? { id: postId } : "skip",
  );

  // Mutations
  const updatePost = useMutation(api.posts.updatePost);
  const generateUploadUrl = useMutation(api.http.generateUploadUrl);

  // State
  const [isUploading, setIsUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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

  // Load post data into form when available
  useEffect(() => {
    if (post) {
      form.reset({
        title: post.title,
        slug: post.slug,
        description: post.description,
        content: post.content,
        status: post.status,
        image: post.image,
        imageStorageId: post.imageStorageId as string | undefined,
      });

      // Set image preview - use image URL or generate from storage ID
      const imageUrl =
        post.image ||
        (post.imageStorageId ? `/api/storage/${post.imageStorageId}` : null);
      if (imageUrl) {
        setPreviewImage(imageUrl);
      }

      setIsLoading(false);
    }
  }, [post, form]);

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

    // Only auto-generate slug if it matches the current title's slug
    const currentSlug = form.getValues("slug");
    const currentTitle = post?.title || "";

    if (currentSlug === generateSlug(currentTitle)) {
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

      // Get the direct Convex storage URL
      const convexClient = new (
        await import("convex/browser")
      ).ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
      const imageUrl = await convexClient.query(
        (await import("../../../../../../convex/_generated/api")).api.storage
          .getStorageUrl,
        { storageId },
      );

      if (!imageUrl) {
        throw new Error("Failed to get image URL from storage");
      }

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
        description:
          "There was an error uploading your image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  // Handle form submission
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // Update the post in Convex
      if (!postId) return;

      await updatePost({
        id: postId,
        title: values.title,
        slug: values.slug,
        description: values.description,
        content: values.content,
        status: values.status,
        image: values.image,
        imageStorageId: values.imageStorageId as any,
      });

      toast({
        title: "Post updated",
        description: `Your post has been successfully updated.`,
      });

      // Navigate back to posts list
      router.push("/cms/posts");
    } catch (error: any) {
      toast({
        title: "Error",
        description:
          error.message || "Failed to update post. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (!post && isLoading) {
    return (
      <CMSLayout>
        <div className="h-[60vh] flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
        </div>
      </CMSLayout>
    );
  }

  if (!post && !isLoading) {
    return (
      <CMSLayout>
        <div className="h-[60vh] flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Post Not Found
          </h2>
          <p className="text-gray-600 mb-4">
            The post you're trying to edit doesn't exist or you don't have
            permission to access it.
          </p>
          <Button onClick={() => router.push("/cms/posts")}>
            Return to Posts
          </Button>
        </div>
      </CMSLayout>
    );
  }

  return (
    <CMSLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Edit Post</h1>
          <Button variant="outline" onClick={() => router.push("/cms/posts")}>
            Cancel
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Edit Post</CardTitle>
            <CardDescription>Update your post details</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
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
                        <Input placeholder="enter-post-slug" {...field} />
                      </FormControl>
                      <FormDescription>
                        The URL-friendly version of the title
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
                          <SelectItem value="archived">Archived</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Published posts are visible on the website, drafts are
                        only visible in the CMS
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
                                {isUploading
                                  ? "Uploading..."
                                  : "Upload an image"}
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
                      <FormControl>
                        <MarkdownEditor
                          value={field.value}
                          onChange={field.onChange}
                          placeholder="Write your post content in markdown..."
                          label="Content"
                          height={500}
                          showStats={true}
                          error={form.formState.errors.content?.message}
                        />
                      </FormControl>
                      <FormDescription>
                        Write your post content using markdown formatting. Use the preview tab to see how it will look.
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
                        Save Changes
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
