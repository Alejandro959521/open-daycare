import { Post } from "./mock";

const STORAGE_KEY = "opendaycare:posts";

export function getUserPosts(): Post[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];
  return JSON.parse(stored);
}

export function addUserPost(post: Post): void {
  const posts = getUserPosts();
  posts.unshift(post);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  window.dispatchEvent(new Event("opendaycare:posts-updated"));
}

export function generatePostId(): string {
  return `post-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
