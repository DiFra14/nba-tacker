import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from 'environments/environment';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators'
import * as moment from 'moment'
import type {TeamsData, Team} from '@/models/team'
import type {Game, GameStatsData} from "@/models/gameStats";
import type {TeamGamesResult} from "@/models/gameResult";

@Injectable({
  providedIn: 'root'
})
export class TrackerService {
  selectedGamesStatsTeamsSubject: BehaviorSubject<TeamGamesResult[]> = new BehaviorSubject<TeamGamesResult[]>([])

  constructor(private httpClient: HttpClient) {
  }

  getAllTeams(): Observable<Team[]> {
    return this.httpClient.get<TeamsData>(`${environment.baseUrl}/teams`).pipe(
      map((teamsData: TeamsData) => teamsData.data)
    )
  }

  getAllGamesOfSpecificTeam(teamId: string, xDays = 12, page = 0, perPage = 12): Observable<TeamGamesResult> {
    let params = new HttpParams().append('page', page).append('per_page', perPage)
    const last12days = this.getLastXDays(xDays)
    last12days.forEach((day) => params = params.append('dates[]', day))
    return this.httpClient.get<GameStatsData>(`${environment.baseUrl}/games?team_ids[]=${teamId}`, {params}).pipe(
      map((gamesData: GameStatsData) => {
        const team = gamesData.data.map((game) => game.home_team.id === +teamId ? game.home_team : game.visitor_team)[0]
        const avgScoredPoints = this.calcolateAvgScoredPoints(team, gamesData.data, 'home')
        const avgConcededPoints = this.calcolateAvgScoredPoints(team, gamesData.data, 'visitor')
        const response = gamesData.data.map((game) => {
          const isHomeTeam = this.checkIsHomeTeam(teamId, game)
          return {
            homeTeam: game.home_team,
            visitorTeam: game.visitor_team,
            result: isHomeTeam ? (game.home_team_score < game.visitor_team_score ? 'L' : 'W') : (game.visitor_team_score < game.home_team_score ? 'L' : 'W'),
            homeScore: game.home_team_score,
            visitorScore: game.visitor_team_score
          }
        })
        return {
          selectedTeam: team,
          gamesResult: response,
          avgScoredPoints,
          avgConcededPoints
        }
      })
    )
  }

  setSelectedGamesStatsTeamsSubject(teamGamesResult: TeamGamesResult): void {
    const currentTeamGamesResult = this.selectedGamesStatsTeamsSubject.value
    if (!currentTeamGamesResult.find((teams) => teams.selectedTeam.id === teamGamesResult.selectedTeam.id)) {
      this.selectedGamesStatsTeamsSubject.next([...currentTeamGamesResult, teamGamesResult])
    }
  }

  setNewHistoryTeams(teamsGamesResult: TeamGamesResult[]): void {
    this.selectedGamesStatsTeamsSubject.next(teamsGamesResult)
  }

  getSelectedGamesStatsTeamsSubject(): Observable<TeamGamesResult[]> {
    return this.selectedGamesStatsTeamsSubject.asObservable()
  }

  removeSelectedTeamFromHistory(teamId: number): void {
    let selectedTeamsGames = this.selectedGamesStatsTeamsSubject.value
    selectedTeamsGames = selectedTeamsGames.filter((teamGames) => teamGames.selectedTeam.id !== teamId)
    this.setNewHistoryTeams(selectedTeamsGames)
  }

  private calcolateAvgScoredPoints(team: Team, games: Game[], type: ('home' | 'visitor')): number {
    const lastDaysPoints: number[] = games.map((game) => {
      const isHomeTeam = this.checkIsHomeTeam(team.id.toString(), game)
      if (type === 'home') {
        return isHomeTeam ? game.home_team_score : game.visitor_team_score
      } else {
        return isHomeTeam ? game.visitor_team_score : game.home_team_score
      }
    })
    const avgScoredPoints = lastDaysPoints.reduce((acc, cur) => {
      return acc += cur
    }, 0)
    return Math.round(avgScoredPoints / lastDaysPoints.length)
  }

  private checkIsHomeTeam(teamId: string, game: Game): boolean {
    return game.home_team.id === +teamId
  }

  private getLastXDays(days: number): string[] {
    const lastDays: string[] = []
    for (let i = 1; i <= days; i++) {
      const today = moment()
      lastDays.push(today.subtract(i, 'day').format('YYYY-MM-DD'))
    }
    return lastDays
  }
}
