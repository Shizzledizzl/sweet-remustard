import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const TRANSACTIONS = [
  {
    id: "1",
    date: "2024-03-19",
    description: "Raid Consumables",
    amount: -5000,
    player: "Thrall"
  },
  {
    id: "2",
    date: "2024-03-18",
    description: "Raid Loot Sales",
    amount: 15000,
    player: "Jaina"
  },
  {
    id: "3",
    date: "2024-03-17",
    description: "Repair Costs",
    amount: -2000,
    player: "Anduin"
  },
  {
    id: "4",
    date: "2024-03-16",
    description: "Material Sales",
    amount: 8000,
    player: "Thrall"
  }
]

const STATS = [
  {
    title: "Total Gold",
    value: "125,000g",
    description: "Current balance"
  },
  {
    title: "Weekly Income",
    value: "+23,000g",
    description: "From sales and donations"
  },
  {
    title: "Weekly Expenses",
    value: "-7,000g",
    description: "Consumables and repairs"
  },
  {
    title: "Reserved Funds",
    value: "50,000g",
    description: "For guild progression"
  }
]

export default function BankPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Guild Bank</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat) => (
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

      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Player</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {TRANSACTIONS.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell>{transaction.player}</TableCell>
                    <TableCell className="text-right">
                      <span className={transaction.amount > 0 ? "text-green-500" : "text-red-500"}>
                        {transaction.amount > 0 ? "+" : ""}{transaction.amount}g
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 