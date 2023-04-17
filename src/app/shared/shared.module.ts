import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TeamScoresComponent} from './components/team-scores/team-scores.component';

@NgModule({
  declarations: [
    TeamScoresComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TeamScoresComponent
  ]
})
export class SharedModule {
}
