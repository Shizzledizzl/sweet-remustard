"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const stats = [
  {
    title: "Overall Attendance",
    value: "92%",
    description: "Last 30 days",
  },
  {
    title: "Perfect Attendance",
    value: "15",
    description: "Players with 100%",
  },
  {
    title: "No Shows",
    value: "3",
    description: "Unexcused absences",
  },
  {
    title: "Active Raiders",
    value: "42",
    description: "Regular raiders",
  },
]

export function AttendanceStats() {
  return (
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
  )
} 