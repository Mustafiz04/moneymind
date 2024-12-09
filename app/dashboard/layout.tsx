import { Sidebar } from "@/components/layout/sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="fixed top-0 z-50 w-full bg-background border-b">
        <div className="flex h-16 items-center gap-4 px-4 md:px-6">
          <Sidebar />
          <div className="flex-1">
            <h1 className="text-xl font-bold">Money Mind</h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex pt-16 h-screen">
        {/* Desktop sidebar spacer */}
        <div className="hidden md:block w-72 flex-shrink-0" />
        
        {/* Main content area */}
        <main className="flex-1 overflow-auto px-4 md:px-6 py-6">
          {children}
        </main>
      </div>
    </div>
  )
} 