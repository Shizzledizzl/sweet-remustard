import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const UPCOMING_RAIDS = [
  {
    id: "1",
    name: "Blackwing Lair",
    date: "2024-03-20",
    time: "20:00",
    status: "scheduled",
    signups: {
      tanks: 2,
      healers: 5,
      dps: 15
    }
  },
  {
    id: "2",
    name: "Molten Core",
    date: "2024-03-22",
    time: "20:00",
    status: "scheduled",
    signups: {
      tanks: 2,
      healers: 4,
      dps: 12
    }
  }
]

const PAST_RAIDS = [
  {
    id: "3",
    name: "Onyxia's Lair",
    date: "2024-03-15",
    time: "20:00",
    status: "completed",
    loot: 12
  },
  {
    id: "4",
    name: "Blackwing Lair",
    date: "2024-03-13",
    time: "20:00",
    status: "completed",
    loot: 15
  }
]

export default function RaidsPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Raids</h2>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium mb-4">Upcoming Raids</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {UPCOMING_RAIDS.map((raid) => (
              <Card key={raid.id}>
                <CardHeader>
                  <CardTitle>{raid.name}</CardTitle>
                  <CardDescription>
                    {raid.date} at {raid.time}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-sm font-medium">Tanks</p>
                      <p className="text-2xl font-bold">{raid.signups.tanks}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Healers</p>
                      <p className="text-2xl font-bold">{raid.signups.healers}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">DPS</p>
                      <p className="text-2xl font-bold">{raid.signups.dps}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4">Past Raids</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {PAST_RAIDS.map((raid) => (
              <Card key={raid.id}>
                <CardHeader>
                  <CardTitle>{raid.name}</CardTitle>
                  <CardDescription>
                    {raid.date} at {raid.time}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <p className="text-sm font-medium">Items Distributed</p>
                    <p className="text-2xl font-bold">{raid.loot}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 