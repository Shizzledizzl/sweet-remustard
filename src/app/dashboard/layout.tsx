import { MainNav } from "@/components/features/main-nav"
import { UserNav } from "@/components/features/user-nav"
import { RosterProvider } from "@/lib/roster-context"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <RosterProvider>
      <div className="flex min-h-screen flex-col">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              <UserNav />
            </div>
          </div>
        </div>
        <div className="flex-1">{children}</div>
      </div>
    </RosterProvider>
  )
} 