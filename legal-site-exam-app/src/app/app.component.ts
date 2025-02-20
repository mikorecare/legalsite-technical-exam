import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeadNavigationListComponent } from './components/head-navigation-list/head-navigation-list.component';
import { SpeechListComponent } from "./components/speech-list/speech-list.component";
import { FormTextAreaComponent } from "./components/form-text-area/form-text-area.component";

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeadNavigationListComponent,
    SpeechListComponent,
    FormTextAreaComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'legal-site-exam-app';
}
