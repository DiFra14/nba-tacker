import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <header>
        <h1>NBA Score Tracking App</h1>
      </header>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [
    `
     .container {
      padding: 1rem;

      header {
        margin-bottom: 1rem;
      }
    }
    `
  ]
})
export class AppComponent {
}
