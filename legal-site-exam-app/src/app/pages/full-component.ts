import { Component, OnInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";

import { HeadNavigationListComponent } from "../components/head-navigation-list/head-navigation-list.component";
import { SpeechListComponent } from "../components/speech-list/speech-list.component";
import { FormTextEditorComponent } from "../components/form-text-editor/form-text-editor.component";
import { GlobalService } from "../services/global.service";

@Component({
    selector: 'full-component',
    imports: [
        HeadNavigationListComponent,
        SpeechListComponent,
        FormTextEditorComponent
    ],
    templateUrl: './full-component.html',
    styleUrl: './full-component.scss',
    standalone: true
})
export class FullComponent implements OnInit { 

    constructor(
        private readonly globalService: GlobalService
    ){ }

    public ngOnInit(): void {
        this.globalService.loadData();
    }
}