import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TrackerRoutingModule} from './tracker-routing.module';
import {TrackerComponent} from './tracker.component';

import {FormsModule} from '@angular/forms'
import {SharedModule} from '@/shared/shared.module';

@NgModule({
  declarations: [
    TrackerComponent
  ],
  imports: [
    CommonModule,
    TrackerRoutingModule,
    FormsModule,
    SharedModule
  ]
})
export class TrackerModule {
}
