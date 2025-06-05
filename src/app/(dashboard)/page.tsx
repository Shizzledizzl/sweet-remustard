import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DashboardPage() {
  const stats = [
    {
      title: "Next Raid",
      value: "Blackwing Lair",
      description: "Wednesday, 8:00 PM",
    },
    {
      title: "Active Raiders",
      value: "42",
      description: "Online in last 24h",
    },
    {
      title: "Guild Bank",
      value: "25,000g",
      description: "Available funds",
    },
    {
      title: "Raid Progress",
      value: "14/14",
      description: "Current phase",
    },
  ]

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 