import { posts } from "@/app/data/mock";
import PostCard from "@/components/post-card";
import Sidebar from "@/components/sidebar";

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col bg-cream lg:flex-row">
      <Sidebar active="feed" />
      <main className="min-w-0 flex-1 overflow-y-auto lg:h-screen">
        <div className="mx-auto w-full max-w-[760px] px-5 pb-20 pt-[34px] lg:px-10">
          <div className="flex flex-col gap-4">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
