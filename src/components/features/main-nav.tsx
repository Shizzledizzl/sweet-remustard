"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const routes = [
    {
      href: "/dashboard",
      label: "Overview"
    },
    {
      href: "/dashboard/roster",
      label: "Roster"
    },
    {
      href: "/dashboard/raids",
      label: "Raids"
    },
    {
      href: "/dashboard/bank",
      label: "Bank"
    }
  ]

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className="text-sm font-medium transition-colors hover:text-primary"
        >
          {route.label}
        </Link>
      ))}
    </nav>
  )
} 