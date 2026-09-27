import Sidebar from "@/components/sidebar";

export default function Page() {
  return (
    <div className="flex min-h-screen bg-cream">
      <Sidebar active="feed" />
      <main className="h-screen min-w-0 flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-[760px] px-10 pb-20 pt-[34px]" />
      </main>
    </div>
  );
}
