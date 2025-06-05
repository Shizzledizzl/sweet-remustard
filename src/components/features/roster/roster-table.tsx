import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const mockRoster = [
  {
    id: "1",
    name: "Thunderfury",
    class: "Warrior",
    role: "Tank",
    level: 60,
    rank: "Officer",
    lastSeen: "2 hours ago",
  },
  {
    id: "2",
    name: "Shadowmend",
    class: "Priest",
    role: "Healer",
    level: 60,
    rank: "Raider",
    lastSeen: "1 day ago",
  },
  {
    id: "3",
    name: "Frostbolt",
    class: "Mage",
    role: "DPS",
    level: 60,
    rank: "Raider",
    lastSeen: "3 hours ago",
  },
]

export function RosterTable() {
  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Class</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Level</TableHead>
            <TableHead>Rank</TableHead>
            <TableHead>Last Seen</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockRoster.map((character) => (
            <TableRow key={character.id}>
              <TableCell>{character.name}</TableCell>
              <TableCell>{character.class}</TableCell>
              <TableCell>{character.role}</TableCell>
              <TableCell>{character.level}</TableCell>
              <TableCell>{character.rank}</TableCell>
              <TableCell>{character.lastSeen}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
} 