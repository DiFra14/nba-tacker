import {Component} from '@angular/core';
import {TrackerService} from "./services/tracker.service";
import {NgForm} from '@angular/forms'
import type {GameResult, TeamGamesResult} from "@/models/gameResult";
import {Router} from "@angular/router";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-tracker',
  template: `
    <div>
      <ng-container *ngIf="teams$ | async as teams">
        <form (ngSubmit)="onSubmitTrackForm(trackForm)" #trackForm="ngForm">
          <div class="select-team">
            <select id="teamSelect" name="selectedTeam" [ngModel]="'1'" >
              <option *ngFor="let team of teams" [value]="team.id" >
                {{ team.full_name }}
              </option>
            </select>
            <button id="trackBtn">Track team</button>
          </div>
        </form>
      </ng-container>
      <div class="teams-score" *ngIf="selectedGamesStatsTeams$ | async as selectedGamesStatsTeams">
        <ng-container *ngFor="let gamesStatsTeam of selectedGamesStatsTeams; trackBy: trackByFn">
          <app-team-scores [days]="days" [teamGamesResult]="gamesStatsTeam"
            (onCloseSelectedTeamEmitter)="onCloseSelectedTeamHanlder($event)"
            (onSelectTeamResultsEmitter)="onSelectResultsHandler($event)"
          ></app-team-scores>
        </ng-container>
      </div>
    </div>
  `,
  styles: [
    `
    .select-team {
      display: flex;
      gap: 0.5rem;
    }
    
    .teams-score {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      margin-top: 1rem;
    }
    `
  ]
})
export class TrackerComponent {
  days: number = environment.days
  teams$ = this.trackerService.getAllTeams()
  selectedGamesStatsTeams$ = this.trackerService.getSelectedGamesStatsTeamsSubject()

  constructor(private trackerService: TrackerService, private router: Router) {
  }

  onSubmitTrackForm(trackerForm: NgForm): void {
    const {selectedTeam: teamId} = trackerForm.value
    this.trackerService.getAllGamesOfSpecificTeam(teamId, this.days).subscribe((teamGamesResults: TeamGamesResult) => {
      this.trackerService.setSelectedGamesStatsTeamsSubject(teamGamesResults)
    })
  }

  onCloseSelectedTeamHanlder(teamId: number): void {
    this.trackerService.removeSelectedTeamFromHistory(teamId)
  }

  onSelectResultsHandler(teamId: number): void {
    this.router.navigate([`results/${teamId}`])
  }

  trackByFn(index: number, team: TeamGamesResult): number {
    return team.selectedTeam.id
  }
}
