"use client";

import { useSyncExternalStore } from "react";
import { posts as mockPosts, type Post } from "@/app/data/mock";
import { getUserPosts } from "@/app/data/posts";
import PostCard from "@/components/post-card";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getSnapshot(): Post[] {
  return getUserPosts();
}

function getServerSnapshot(): Post[] {
  return [];
}

export default function FeedPosts() {
  const userPosts = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const allPosts = [...userPosts, ...mockPosts].sort((a, b) => {
    const dateA = a.createdAt ?? "1970-01-01T00:00:00.000Z";
    const dateB = b.createdAt ?? "1970-01-01T00:00:00.000Z";
    return new Date(dateB).getTime() - new Date(dateA).getTime();
  });

  return (
    <div className="flex flex-col gap-4">
      {allPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
