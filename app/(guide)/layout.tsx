import Sidebar from "@/components/Sidebar";

export default function GuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <Sidebar />
      <main className="min-w-0 flex-1">
        <div className="mx-auto w-full max-w-4xl px-5 py-10 sm:px-8 sm:py-14">
          {children}
        </div>
      </main>
    </div>
  );
}
