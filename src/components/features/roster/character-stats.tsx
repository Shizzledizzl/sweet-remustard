import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const stats = [
  {
    title: "Item Level",
    value: "213",
    description: "Average equipped",
  },
  {
    title: "Raid Progress",
    value: "10/10",
    description: "Current tier",
  },
  {
    title: "Achievement Points",
    value: "15,430",
    description: "Total points",
  },
  {
    title: "PvP Rating",
    value: "1850",
    description: "Current season",
  },
]

export function CharacterStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
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
  )
} 