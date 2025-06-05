"use client"

import { createContext, useContext, useState } from "react"

type Player = {
  id: string
  name: string
  class: string
  role: string
  spec: string
  level: number
}

type RosterContextType = {
  players: Player[]
  addPlayer: (player: Omit<Player, "id">) => void
  removePlayer: (id: string) => void
  updatePlayer: (id: string, player: Partial<Player>) => void
}

const RosterContext = createContext<RosterContextType | undefined>(undefined)

export function RosterProvider({ children }: { children: React.ReactNode }) {
  const [players, setPlayers] = useState<Player[]>([])

  const addPlayer = (player: Omit<Player, "id">) => {
    setPlayers([...players, { ...player, id: Math.random().toString() }])
  }

  const removePlayer = (id: string) => {
    setPlayers(players.filter((p) => p.id !== id))
  }

  const updatePlayer = (id: string, update: Partial<Player>) => {
    setPlayers(
      players.map((p) => (p.id === id ? { ...p, ...update } : p))
    )
  }

  return (
    <RosterContext.Provider value={{ players, addPlayer, removePlayer, updatePlayer }}>
      {children}
    </RosterContext.Provider>
  )
}

export function useRoster() {
  const context = useContext(RosterContext)
  if (context === undefined) {
    throw new Error("useRoster must be used within a RosterProvider")
  }
  return context
} 