import { Component, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { UserNavComponent } from "./components/navbar/navbar.component";

@Component({
  selector: 'app-root',
  imports: [
    UserNavComponent,
    RouterOutlet
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class AppComponent { }
