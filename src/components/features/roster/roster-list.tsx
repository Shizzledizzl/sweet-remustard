"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PlayerForm } from "./player-form"
import { useRoster } from "@/lib/roster-context"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"

export function RosterList() {
  const { players, removePlayer } = useRoster()

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">
            Guild Members
          </h2>
          <p className="text-sm text-muted-foreground">
            Manage your guild roster and member roles
          </p>
        </div>
        <PlayerForm />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Class</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Rank</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {players.map((player) => (
              <TableRow key={player.id}>
                <TableCell className="font-medium">{player.name}</TableCell>
                <TableCell className="capitalize">{player.class}</TableCell>
                <TableCell className="capitalize">{player.role}</TableCell>
                <TableCell className="capitalize">{player.rank}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removePlayer(player.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
} 