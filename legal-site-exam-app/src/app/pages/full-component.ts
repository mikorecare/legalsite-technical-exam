import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { HeadNavigationListComponent } from "../components/head-navigation-list/head-navigation-list.component";
import { SpeechListComponent } from "../components/speech-list/speech-list.component";
import { FormTextAreaComponent } from "../components/form-text-area/form-text-area.component";

@Component({
    selector: 'full-component',
    imports: [
        HeadNavigationListComponent,
        RouterOutlet
    ],
    templateUrl: './full-component.html',
      styleUrl: './full-component.scss',
    standalone: true
})
export class FullComponent { }