import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeadNavigationListComponent } from './components/head-navigation-list/head-navigation-list.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeadNavigationListComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'legal-site-exam-app';
}
