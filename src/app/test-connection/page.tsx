"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

export default function TestConnectionPage() {
  const posts = useQuery(api.posts.getPublishedPosts);
  const menuItems = useQuery(api.menuItems.getVisibleMenuItems);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Convex Connection Test</h1>
      
      <div className="space-y-6">
        <div className="p-4 border rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Environment</h2>
          <p><strong>Convex URL:</strong> {process.env.NEXT_PUBLIC_CONVEX_URL || 'Not set'}</p>
        </div>

        <div className="p-4 border rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Posts Query Status</h2>
          {posts === undefined ? (
            <p className="text-yellow-600">Loading posts...</p>
          ) : posts === null ? (
            <p className="text-red-600">Failed to load posts</p>
          ) : (
            <div>
              <p className="text-green-600">✓ Successfully loaded {posts.length} posts</p>
              <ul className="mt-2 space-y-1">
                {posts.slice(0, 3).map((post) => (
                  <li key={post._id} className="text-sm text-gray-600">
                    • {post.title} ({post.status})
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="p-4 border rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Menu Items Query Status</h2>
          {menuItems === undefined ? (
            <p className="text-yellow-600">Loading menu items...</p>
          ) : menuItems === null ? (
            <p className="text-red-600">Failed to load menu items</p>
          ) : (
            <div>
              <p className="text-green-600">✓ Successfully loaded {menuItems.length} menu items</p>
              <ul className="mt-2 space-y-1">
                {menuItems.map((item) => (
                  <li key={item._id} className="text-sm text-gray-600">
                    • {item.title} → {item.href} ({item.isVisible ? 'visible' : 'hidden'})
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 