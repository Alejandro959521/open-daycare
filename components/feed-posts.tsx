"use client";

import { useSyncExternalStore } from "react";
import { posts as mockPosts, type Post } from "@/app/data/mock";
import PostCard from "@/components/post-card";

const STORAGE_KEY = "opendaycare:posts";
const EMPTY_POSTS: Post[] = [];

let cachedPosts: Post[] | null = null;

function loadPosts(): Post[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];
  return JSON.parse(stored);
}

const subscribers = new Set<() => void>();

function subscribe(callback: () => void) {
  subscribers.add(callback);
  return () => subscribers.delete(callback);
}

function notifyChange() {
  cachedPosts = loadPosts();
  subscribers.forEach((cb) => cb());
}

window.addEventListener("opendaycare:posts-updated", notifyChange);

function getSnapshot(): Post[] {
  if (cachedPosts === null) {
    cachedPosts = loadPosts();
  }
  return cachedPosts;
}

function getServerSnapshot(): Post[] {
  return EMPTY_POSTS;
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
