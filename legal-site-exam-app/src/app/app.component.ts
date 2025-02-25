import { Component, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FullComponent } from "./pages/full-component";

@Component({
  selector: 'app-root',
  imports: [
    FullComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class AppComponent { }
