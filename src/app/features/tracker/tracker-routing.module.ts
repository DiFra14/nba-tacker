import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TrackerComponent} from "./tracker.component";
import {GameResultsComponent} from "@/features/game-results/game-results.component";
import {TeamsGuard} from "@/core/guards/teams.guard";

const routes: Routes = [
  {
    path: '',
    component: TrackerComponent
  },
  {
    path: 'results/:team',
    component: GameResultsComponent,
    canActivate: [TeamsGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrackerRoutingModule {
}
