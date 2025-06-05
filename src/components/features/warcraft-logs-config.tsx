"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { getGuildReports } from "@/lib/warcraftlogs"

const DEFAULT_CONFIG = {
  clientId: "9f148174-057b-4479-98e3-77175a476032",
  clientSecret: "jWuhJFYpisGR3t4CGY4sbWERKtgRGgeTOhE4BHkE",
  guildName: "sweet remustard",
  serverName: "thunderstrike",
  serverRegion: "eu"
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
      // Keep exact values from URL structure
      const formattedServerName = config.serverName.trim().toLowerCase()
      const formattedRegion = config.serverRegion.toLowerCase()
      const formattedGuildName = config.guildName.trim().toLowerCase()

      console.log('Attempting to fetch reports for Classic Fresh guild:', {
        guildName: formattedGuildName,
        serverName: formattedServerName,
        region: formattedRegion,
        url: `https://fresh.warcraftlogs.com/guild/${formattedRegion}/${formattedServerName}/${encodeURIComponent(formattedGuildName)}`
      })

      const reports = await getGuildReports(
        formattedGuildName,
        formattedServerName,
        formattedRegion,
        {
          clientId: config.clientId,
          clientSecret: config.clientSecret
        }
      )

      if (reports && reports.length > 0) {
        console.log('Found Classic Fresh reports:', reports)
        setReports(reports)
        setIsConfigured(true)
        localStorage.setItem("warcraftlogs_config", JSON.stringify({
          ...config,
          guildName: formattedGuildName,
          serverName: formattedServerName,
          serverRegion: formattedRegion
        }))
      } else {
        setError(`No logs found for guild "${formattedGuildName}" on ${formattedServerName}-${formattedRegion}. Please verify:
        1. The guild name is exactly "sweet remustard" (lowercase with space)
        2. The server name is "thunderstrike" (lowercase)
        3. The guild has public logs uploaded to WarcraftLogs Classic Fresh
        4. You're looking at https://fresh.warcraftlogs.com/guild/${formattedRegion}/${formattedServerName}/${encodeURIComponent(formattedGuildName)}`)
      }
    } catch (err: any) {
      console.error('WarcraftLogs API Error:', err)
      setError(`Failed to connect to WarcraftLogs: ${err.message}. Please verify your guild information.`)
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
                    <a 
                      href={`https://fresh.warcraftlogs.com/reports/${report.code}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-700 hover:underline flex items-center gap-2"
                    >
                      <span>{new Date(report.startTime).toLocaleDateString()}: {report.title}</span>
                      <svg 
                        className="w-4 h-4" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
                        />
                      </svg>
                    </a>
                  </li>
                ))}
              </ul>
              <a
                href={`https://fresh.warcraftlogs.com/guild/${config.serverRegion.toLowerCase()}/${config.serverName.toLowerCase()}/${encodeURIComponent(config.guildName.toLowerCase())}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-500 hover:text-blue-700 hover:underline mt-4 inline-block"
              >
                View all logs on WarcraftLogs →
              </a>
            </div>
            <Button 
              variant="outline"
              onClick={() => setIsConfigured(false)}
              className="mt-4"
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