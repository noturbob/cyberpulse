import { SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full bg-background">
        {/* Sidebar is rendered by SidebarProvider */}
        
        {/* Main Content Wrapper */}
        <div className="flex flex-col flex-1 w-full overflow-hidden">
          
          {/* Page Content - Scrollable */}
          <main className="flex-1 overflow-y-auto w-full">
            <div className="w-full px-4 py-4 md:px-8 md:py-6">
              <div className="mx-auto w-full max-w-6xl">
                {children}
              </div>
            </div>
          </main>
          
        </div>
      </div>
    </SidebarProvider>
  );
}