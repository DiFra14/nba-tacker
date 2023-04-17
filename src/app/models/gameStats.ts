export type GameStatsData = {
  data: Game[]
  meta: Meta
}

export type Game = {
  id: number
  date: string
  home_team: HomeTeam
  home_team_score: number
  period: number
  postseason: boolean
  season: number
  status: string
  time: string
  visitor_team: VisitorTeam
  visitor_team_score: number
}

type HomeTeam = {
  id: number
  abbreviation: string
  city: string
  conference: string
  division: string
  full_name: string
  name: string
}

type VisitorTeam = {
  id: number
  abbreviation: string
  city: string
  conference: string
  division: string
  full_name: string
  name: string
}

type Meta = {
  total_pages: number
  current_page: number
  next_page: any
  per_page: number
  total_count: number
}
