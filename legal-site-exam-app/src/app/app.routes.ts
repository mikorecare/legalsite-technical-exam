import { Routes } from '@angular/router';
import { FullComponent } from './pages/full-component';
import { ViewMySpeechComponent } from './pages/view-my-speech/view-my-speech.component';

export const routes: Routes = [
    {
        path: "",
        component: FullComponent,
        children: [
            {
                path: "view-my-speech",
                component: ViewMySpeechComponent
            },
            {
                path: "",
                redirectTo: "view-my-speech",
                pathMatch: "full"
            }
        ]
    }
];
