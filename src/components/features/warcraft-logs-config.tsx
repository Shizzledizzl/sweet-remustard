"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { getGuildReports } from "@/lib/warcraftlogs"

const DEFAULT_CONFIG = {
  clientId: "9f148174-057b-4479-98e3-77175a476032",
  clientSecret: "jWuhJFYpisGR3t4CGY4sbWERKtgRGgeTOhE4BHkE",
  guildName: "Sweet Remustard",
  serverName: "thunderstrike",
  serverRegion: "EU"
}

export function WarcraftLogsConfig() {
  const [config, setConfig] = useState(DEFAULT_CONFIG)
  const [isConfigured, setIsConfigured] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [reports, setReports] = useState<any[]>([])

  useEffect(() => {
    const savedConfig = localStorage.getItem("warcraftlogs_config")
    if (savedConfig) {
      setConfig(JSON.parse(savedConfig))
      setIsConfigured(true)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      // Test the configuration by fetching guild reports
      const reports = await getGuildReports(
        config.guildName,
        config.serverName.toLowerCase().replace(/[^a-z0-9]/g, ''),
        config.serverRegion,
        {
          clientId: config.clientId,
          clientSecret: config.clientSecret
        }
      )

      if (reports && reports.length > 0) {
        setReports(reports)
        setIsConfigured(true)
        // Store the configuration in localStorage
        localStorage.setItem("warcraftlogs_config", JSON.stringify(config))
      } else {
        setError(`No logs found for ${config.guildName} on ${config.serverName}-${config.serverRegion}. Make sure your guild has logs uploaded to WarcraftLogs.`)
      }
    } catch (err: any) {
      console.error(err)
      setError(err.message || "Failed to connect to Warcraft Logs. Please verify your guild name and server information.")
    } finally {
      setIsLoading(false)
    }
  }

  if (isConfigured && reports.length > 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Warcraft Logs Configuration</CardTitle>
          <CardDescription>Connected to {config.guildName} (Horde) on {config.serverName}-{config.serverRegion}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Recent Reports</h3>
              <ul className="space-y-2">
                {reports.slice(0, 5).map((report) => (
                  <li key={report.code} className="text-sm">
                    {new Date(report.startTime).toLocaleDateString()}: {report.title}
                  </li>
                ))}
              </ul>
            </div>
            <Button 
              variant="outline"
              onClick={() => setIsConfigured(false)}
            >
              Update Configuration
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configure Warcraft Logs</CardTitle>
        <CardDescription>
          Connecting to Sweet Remustard (Horde) on Thunderstrike-EU
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Server Name</label>
            <Input
              value={config.serverName}
              onChange={(e) => setConfig({ ...config, serverName: e.target.value.toLowerCase() })}
              placeholder="thunderstrike"
              required
            />
            <p className="text-xs text-muted-foreground">
              Server name should be lowercase, without spaces
            </p>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Server Region</label>
            <select
              className="w-full rounded-md border border-input bg-background px-3 py-2"
              value={config.serverRegion}
              onChange={(e) => setConfig({ ...config, serverRegion: e.target.value })}
            >
              <option value="EU">EU</option>
              <option value="US">US</option>
              <option value="KR">KR</option>
              <option value="TW">TW</option>
              <option value="CN">CN</option>
            </select>
          </div>
          {error && (
            <div className="text-sm text-red-500">
              {error}
            </div>
          )}
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Connecting..." : "Connect to Warcraft Logs"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
} 