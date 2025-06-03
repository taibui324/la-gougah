"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import { CMSLayout } from "@/components/cms/layout/cms-layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { formatDistanceToNow } from "date-fns";
import { Loader2, PenLine, Plus, Trash, Eye, Archive } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function PostsPage() {
  const posts = useQuery(api.posts.getAllPosts);
  const deletePost = useMutation(api.posts.deletePost);
  const updatePost = useMutation(api.posts.updatePost);
  const { toast } = useToast();
  const [pendingId, setPendingId] = useState<Id<"posts"> | null>(null);

  const handleDeletePost = async (id: Id<"posts">) => {
    if (confirm("Are you sure you want to delete this post? This action cannot be undone.")) {
      setPendingId(id);
      try {
        await deletePost({ id });
        toast({
          title: "Post deleted",
          description: "The post has been successfully deleted.",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete post. Please try again.",
          variant: "destructive",
        });
      } finally {
        setPendingId(null);
      }
    }
  };

  const handleUpdateStatus = async (id: Id<"posts">, status: "draft" | "published" | "archived") => {
    setPendingId(id);
    try {
      await updatePost({ id, status });
      toast({
        title: "Post status updated",
        description: `The post has been ${
          status === "published" ? "published" : status === "draft" ? "moved to drafts" : "archived"
        }.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update post status. Please try again.",
        variant: "destructive",
      });
    } finally {
      setPendingId(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Published</Badge>;
      case "draft":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Draft</Badge>;
      case "archived":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">Archived</Badge>;
      default:
        return null;
    }
  };

  return (
    <CMSLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Posts</h1>
          <Button asChild>
            <a href="/cms/posts/new">
              <Plus className="mr-2 h-4 w-4" /> New Post
            </a>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Manage Posts</CardTitle>
            <CardDescription>
              Create, edit, publish, and manage your content
            </CardDescription>
          </CardHeader>
          <CardContent>
            {posts === undefined ? (
              <div className="py-8 flex justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
              </div>
            ) : posts.length === 0 ? (
              <div className="py-12 text-center">
                <h3 className="text-lg font-medium text-gray-900 mb-1">No posts yet</h3>
                <p className="text-gray-500 mb-4">Get started by creating your first post</p>
                <Button asChild>
                  <a href="/cms/posts/new">
                    <Plus className="mr-2 h-4 w-4" /> Create First Post
                  </a>
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {posts.map((post) => (
                  <div
                    key={post._id}
                    className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-medium mb-1 text-gray-900">{post.title}</h3>
                        <p className="text-gray-500 text-sm mb-2 line-clamp-2">{post.description}</p>
                        <div className="flex flex-wrap gap-2 items-center text-xs text-gray-500">
                          <span>Updated {formatDistanceToNow(post.updatedAt, { addSuffix: true })}</span>
                          <span>•</span>
                          {getStatusBadge(post.status)}
                          <span>•</span>
                          <span>{post.slug}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {/* View button for published posts */}
                        {post.status === "published" && (
                          <Button variant="outline" size="sm" asChild>
                            <a href={`/news/${post.slug}`} target="_blank" rel="noopener noreferrer">
                              <Eye className="mr-1 h-4 w-4" /> View
                            </a>
                          </Button>
                        )}

                        {/* Edit button */}
                        <Button variant="outline" size="sm" asChild>
                          <a href={`/cms/posts/edit/${post._id}`}>
                            <PenLine className="mr-1 h-4 w-4" /> Edit
                          </a>
                        </Button>

                        {/* Status change buttons */}
                        {post.status !== "published" && (
                          <Button
                            variant="outline"
                            size="sm"
                            disabled={pendingId === post._id}
                            onClick={() => handleUpdateStatus(post._id, "published")}
                          >
                            {pendingId === post._id ? (
                              <Loader2 className="mr-1 h-4 w-4 animate-spin" />
                            ) : (
                              <Eye className="mr-1 h-4 w-4" />
                            )}
                            Publish
                          </Button>
                        )}
                        {post.status !== "draft" && (
                          <Button
                            variant="outline"
                            size="sm"
                            disabled={pendingId === post._id}
                            onClick={() => handleUpdateStatus(post._id, "draft")}
                          >
                            {pendingId === post._id ? (
                              <Loader2 className="mr-1 h-4 w-4 animate-spin" />
                            ) : (
                              <PenLine className="mr-1 h-4 w-4" />
                            )}
                            To Draft
                          </Button>
                        )}
                        {post.status !== "archived" && (
                          <Button
                            variant="outline"
                            size="sm"
                            disabled={pendingId === post._id}
                            onClick={() => handleUpdateStatus(post._id, "archived")}
                          >
                            {pendingId === post._id ? (
                              <Loader2 className="mr-1 h-4 w-4 animate-spin" />
                            ) : (
                              <Archive className="mr-1 h-4 w-4" />
                            )}
                            Archive
                          </Button>
                        )}

                        {/* Delete button */}
                        <Button
                          variant="destructive"
                          size="sm"
                          disabled={pendingId === post._id}
                          onClick={() => handleDeletePost(post._id)}
                        >
                          {pendingId === post._id ? (
                            <Loader2 className="mr-1 h-4 w-4 animate-spin" />
                          ) : (
                            <Trash className="mr-1 h-4 w-4" />
                          )}
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </CMSLayout>
  );
} 