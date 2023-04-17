import type {Team} from "@/models/team"

export type GameResult = {
  homeTeam: Team
  visitorTeam: Team
  result: string
  homeScore: number
  visitorScore: number
}

export type TeamGamesResult = {
  selectedTeam: Team
  gamesResult: GameResult[]
  avgScoredPoints: number
  avgConcededPoints: number
}
