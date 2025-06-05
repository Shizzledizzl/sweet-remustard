"use client"

const WARCRAFTLOGS_TOKEN_URL = 'https://www.warcraftlogs.com/oauth/token'
const WARCRAFTLOGS_API_URL = 'https://www.warcraftlogs.com/api/v2/client'

type WarcraftLogsConfig = {
  clientId: string
  clientSecret: string
}

export type Report = {
  id: string
  title: string
  startTime: number
  endTime: number
  zone: {
    name: string
  }
}

let accessToken: string | null = null

async function getAccessToken(config: WarcraftLogsConfig) {
  if (accessToken) return accessToken

  const response = await fetch(WARCRAFTLOGS_TOKEN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: config.clientId,
      client_secret: config.clientSecret,
    }),
  })

  if (!response.ok) {
    throw new Error('Failed to get access token')
  }

  const data = await response.json()
  accessToken = data.access_token
  return accessToken
}

async function queryWarcraftLogs(query: string, config: WarcraftLogsConfig) {
  const token = await getAccessToken(config)

  const response = await fetch(WARCRAFTLOGS_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ query }),
  })

  return response.json()
}

export async function getGuildReports(
  guildName: string,
  serverName: string,
  region: string,
  config: WarcraftLogsConfig
) {
  const token = await getAccessToken(config)

  // Format guild and server names according to WarcraftLogs requirements
  const formattedGuildName = encodeURIComponent(guildName.trim())
  const formattedServerName = encodeURIComponent(serverName.trim())
  const formattedRegion = region.toUpperCase()

  const query = `
    query {
      reportData {
        reports(guildName: "${formattedGuildName}", guildServerSlug: "${formattedServerName}", guildServerRegion: "${formattedRegion}") {
          data {
            code
            title
            startTime
            endTime
            zone {
              name
            }
          }
        }
      }
    }
  `

  console.log('Querying WarcraftLogs with:', {
    guildName: formattedGuildName,
    serverName: formattedServerName,
    region: formattedRegion
  })

  const response = await fetch(WARCRAFTLOGS_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ query }),
  })

  if (!response.ok) {
    const error = await response.text()
    console.error('WarcraftLogs API Error Response:', error)
    throw new Error(`Failed to fetch reports: ${error}`)
  }

  const data = await response.json()
  
  if (data.errors) {
    console.error('WarcraftLogs GraphQL Errors:', data.errors)
    const errorMessage = data.errors[0]?.message || 'Unknown GraphQL error'
    throw new Error(`WarcraftLogs API Error: ${errorMessage}`)
  }

  if (!data.data?.reportData?.reports?.data) {
    console.error('Unexpected API response structure:', data)
    throw new Error('Invalid API response format')
  }

  return data.data.reportData.reports.data
}

export async function getReportDetails(reportId: string, config: WarcraftLogsConfig) {
  const query = `
    query {
      reportData {
        report(code: "${reportId}") {
          fights {
            id
            name
            startTime
            endTime
            encounterID
            kill
            difficulty
          }
          masterData {
            actors {
              id
              name
              type
              server
            }
          }
        }
      }
    }
  `

  const result = await queryWarcraftLogs(query, config)
  return result.data.reportData.report
}

export async function getPlayerDetails(reportId: string, fightId: string, config: WarcraftLogsConfig) {
  const query = `
    query {
      reportData {
        report(code: "${reportId}") {
          fights(fightIDs: [${fightId}]) {
            id
            startTime
            endTime
            encounterID
            name
            difficulty
            kill
            damageDealer: playerDetails(type: "DPS")
            healers: playerDetails(type: "Healers")
            tanks: playerDetails(type: "Tanks")
          }
        }
      }
    }
  `

  const result = await queryWarcraftLogs(query, config)
  return result.data.reportData.report.fights[0]
} 