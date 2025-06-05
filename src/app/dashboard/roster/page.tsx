import { RosterList } from "@/components/features/roster/roster-list"

export default function RosterPage() {
  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Raid Roster</h1>
      </div>
      <RosterList />
    </div>
  )
} 