import Sidebar from "@/components/sidebar";

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col bg-cream lg:flex-row">
      <Sidebar active="feed" />
      <main className="min-w-0 flex-1 overflow-y-auto lg:h-screen">
        <div className="mx-auto w-full max-w-[760px] px-5 pb-20 pt-[34px] lg:px-10" />
      </main>
    </div>
  );
}
