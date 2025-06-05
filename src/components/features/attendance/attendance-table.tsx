"use client"

import * as React from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"

const mockData = [
  {
    id: "1",
    player: "Thunderfury",
    class: "Warrior",
    role: "Tank",
    attendance: "95%",
    lastRaids: [true, true, true, false, true],
    noShows: 1,
  },
  {
    id: "2",
    player: "Shadowmend",
    class: "Priest",
    role: "Healer",
    attendance: "100%",
    lastRaids: [true, true, true, true, true],
    noShows: 0,
  },
  {
    id: "3",
    player: "Frostbolt",
    class: "Mage",
    role: "DPS",
    attendance: "85%",
    lastRaids: [true, false, true, true, true],
    noShows: 2,
  },
]

export function AttendanceTable() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Player</TableHead>
            <TableHead>Class</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Attendance</TableHead>
            <TableHead>Last 5 Raids</TableHead>
            <TableHead>No Shows</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockData.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.player}</TableCell>
              <TableCell>{row.class}</TableCell>
              <TableCell>{row.role}</TableCell>
              <TableCell>{row.attendance}</TableCell>
              <TableCell>
                <div className="flex space-x-1">
                  {row.lastRaids.map((attended, i) => (
                    <div
                      key={i}
                      className={`h-2 w-2 rounded-full ${
                        attended ? "bg-green-500" : "bg-red-500"
                      }`}
                    />
                  ))}
                </div>
              </TableCell>
              <TableCell>{row.noShows}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem>Edit Attendance</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">
                      Mark as No Show
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
} 