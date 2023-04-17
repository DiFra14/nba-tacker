export type TeamsData = {
  data: Team[]
  meta: Meta
}

export type Team = {
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
  next_page: number
  per_page: number
  total_count: number
}
