import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {TeamGamesResult} from "@/models/gameResult";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-team-scores',
  template: `
    <div *ngIf="teamGamesResult" class="teamScores">
      <div>
        <div class="left">
          <div class="teamHeader">
            <h2 class="team">{{ teamGamesResult.selectedTeam.full_name }} [{{ teamGamesResult.selectedTeam.abbreviation }}]</h2>
            <p>{{ teamGamesResult.selectedTeam.conference }} conference</p>
          </div>
          <hr>
          <div class="stats">
            <p>Results of past {{ days }}:</p>
            <div class="results">
              <span *ngFor="let game of teamGamesResult.gamesResult" [ngStyle]="{'background': game.result === 'L' ?'red' : 'green'}">{{ game.result }}</span>
            </div>
            <div class="scoredPoints">
              <p>Avg points scored: <strong>{{ teamGamesResult.avgScoredPoints }}</strong></p>
              <p>Avg points conceded: <strong>{{ teamGamesResult.avgConcededPoints }}</strong></p>
            </div>
          </div>
        </div>
        <div class="right">
           <span (click)="onCloseSelectedTeam(teamGamesResult.selectedTeam.id)" [id]="removeId">X</span>
           <img [src]="teamLogo" alt="team-logo" width="150" />
        </div>
      </div>
      <button [id]="resultsId" (click)="onSelectTeamResults(teamGamesResult.selectedTeam.id)">See game results</button>
    </div>
  `,
  styles: [
    `
    .teamHeader {
      margin-bottom: 1rem;
      .team {
        font-size: 1.6rem;
      }
    }

    .teamScores {
      padding: 1rem;
      border: 1px solid #EFEFEF;
      width: 450px;
      min-width: 200px;
      min-height: 290px;
      display: flex;
      flex-direction: column;
      align-items: start;
      gap: 1rem;
      & > div {
        display: flex;
        gap: 1rem;
      }
    }
    
    .stats {
      margin-top: 1rem;
      .results {
        display: flex;
        gap: 0.2rem;
        margin-top: 0.5rem;
      
        & > span {
          min-width: 30px;
          min-height: 30px;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 50%;
          color: white;
          font-size: 0.8rem;
        }
      }
      .scoredPoints {
        margin-top: 0.5rem;
        display: flex;
        flex-direction: column;
        gap: 0.2rem;
      }
    }
    .right {
      position: relative;
       span {
          position: absolute;
          display: block;
          top: -0.5rem;
          right: 0;
          cursor: pointer;
        }
     }
    `
  ]
})
export class TeamScoresComponent implements OnChanges {
  @Input() teamGamesResult!: TeamGamesResult
  @Input() days!: number
  @Output() onCloseSelectedTeamEmitter: EventEmitter<number> = new EventEmitter<number>()
  @Output() onSelectTeamResultsEmitter: EventEmitter<number> = new EventEmitter<number>()
  removeId = ''
  resultsId = ''
  teamLogo = ''

  ngOnChanges(): void {
    this.teamLogo = `${environment.logoBaseUrl}/${this.teamGamesResult.selectedTeam.abbreviation}.png`
    this.removeId = `remove${this.teamGamesResult.selectedTeam.abbreviation}`
    this.resultsId = `results${this.teamGamesResult.selectedTeam.abbreviation}`
  }

  onCloseSelectedTeam(teamId: number): void {
    this.onCloseSelectedTeamEmitter.emit(teamId)
  }

  onSelectTeamResults(teamId: number): void {
    this.onSelectTeamResultsEmitter.emit(teamId)
  }
}
