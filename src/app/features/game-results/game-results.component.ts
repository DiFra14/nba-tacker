import {Component} from '@angular/core';
import {TrackerService} from "@/features/tracker/services/tracker.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {mergeMap, map} from "rxjs/operators";
import {environment} from 'environments/environment';

@Component({
  selector: 'app-game-results',
  template: `
      <ng-container *ngIf="selectedTeam$ | async as team">
        <div *ngIf="team" class="gamesResult">
          <div class="gamesResultHeader">
            <h2 class="team">{{ team.selectedTeam.full_name }} [{{ team.selectedTeam.abbreviation }}]</h2>
            <p>{{ team.selectedTeam.conference }} conference</p>
          </div>
          <hr>
          <div class="scores">
            <p>Scores of past {{days}} days:</p>
            <div *ngFor="let game of team.gamesResult" class="results">
              <span>{{ game.homeTeam.abbreviation }}</span> {{ game.homeScore }} - {{ game.visitorScore }} <span>{{ game.visitorTeam.abbreviation }}</span> 
            </div>
          </div>
          <a class="btn" routerLink="/" id="backBtn">Back to all team stats</a>
        </div>
      </ng-container>
  `,
  styles: [
    `
    .gamesResult {
      padding: 1rem;
      border: 1px solid #EFEFEF;
      width: 450px;
    
      .gamesResultHeader {
        .team {
          font-size: 1.6rem;
        }
        margin-bottom: 1rem;
      }
    
      .results {
        margin-top: 1rem;
        & > span {
          font-weight: bold;
        }
      }
      .scores {
        margin-top: 1rem;
      }
    
      #backBtn {
        margin-top: 1rem;
      }
    }
    
    .btn {
      border: 1px solid #999999;
      color: #999999;
      outline: none;
      padding: 0.5rem 0.2rem;
      text-decoration: none;
      border-radius: 0.5rem;
      display: block;
      text-align: center;
    }
    `
  ]
})
export class GameResultsComponent {
  selectedTeam$ = this.activatedRoute.paramMap.pipe(
    mergeMap((params: ParamMap) => {
      const teamId = params.get('team')
      return this.trackerService.getSelectedGamesStatsTeamsSubject().pipe(
        map((teams) => {
          if (teamId) {
            return teams.filter((team) => team.selectedTeam.id === +teamId)[0]
          }
          return null
        })
      )
    })
  )
  days: number = environment.days

  constructor(private trackerService: TrackerService, private activatedRoute: ActivatedRoute) {
  }
}
