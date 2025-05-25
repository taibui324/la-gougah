"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Users, Image as ImageIcon, Eye } from "lucide-react";

export function CMSDashboard() {
  const user = useQuery(api.users.getCurrentUserInfo);
  
  // Only load posts and users if user has proper permissions
  const posts = useQuery(
    api.posts.getAllPosts,
    user?.role === "admin" || user?.role === "editor" ? {} : "skip"
  );
  const users = useQuery(
    api.users.getAllUsers,
    user?.role === "admin" ? {} : "skip"
  );

  const canViewPosts = user?.role === "admin" || user?.role === "editor";
  const canViewUsers = user?.role === "admin";

  const stats = [
    {
      title: "Total Posts",
      value: posts?.length || 0,
      description: "Published and draft posts",
      icon: FileText,
      show: canViewPosts,
    },
    {
      title: "Published Posts",
      value: posts?.filter(p => p.status === "published").length || 0,
      description: "Live on website",
      icon: Eye,
      show: canViewPosts,
    },
    {
      title: "Draft Posts",
      value: posts?.filter(p => p.status === "draft").length || 0,
      description: "Unpublished posts",
      icon: FileText,
      show: canViewPosts,
    },
    {
      title: "Total Users",
      value: users?.length || 0,
      description: "Registered users",
      icon: Users,
      show: canViewUsers,
    },
  ];

  const visibleStats = stats.filter(stat => stat.show);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Welcome back, {user?.name || user?.email}! Here's an overview of your content.
        </p>
      </div>

      {/* Stats Grid */}
      {visibleStats.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {visibleStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {canViewPosts && posts && (
          <Card>
            <CardHeader>
              <CardTitle>Recent Posts</CardTitle>
              <CardDescription>
                Your latest content updates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {posts.slice(0, 5).map((post) => (
                  <div key={post._id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">{post.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(post.updatedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      post.status === "published" 
                        ? "bg-green-100 text-green-800" 
                        : post.status === "draft"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-gray-100 text-gray-800"
                    }`}>
                      {post.status}
                    </div>
                  </div>
                ))}
                {posts.length === 0 && (
                  <p className="text-sm text-muted-foreground">No posts yet</p>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common tasks for your role
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {canViewPosts && (
                <>
                  <a
                    href="/cms/posts/new"
                    className="block w-full text-left px-3 py-2 text-sm rounded-md hover:bg-gray-100 transition-colors"
                  >
                    Create New Post
                  </a>
                  <a
                    href="/cms/posts"
                    className="block w-full text-left px-3 py-2 text-sm rounded-md hover:bg-gray-100 transition-colors"
                  >
                    Manage Posts
                  </a>
                </>
              )}
              {canViewUsers && (
                <a
                  href="/cms/users"
                  className="block w-full text-left px-3 py-2 text-sm rounded-md hover:bg-gray-100 transition-colors"
                >
                  Manage Users
                </a>
              )}
              <a
                href="/"
                className="block w-full text-left px-3 py-2 text-sm rounded-md hover:bg-gray-100 transition-colors"
              >
                View Website
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 