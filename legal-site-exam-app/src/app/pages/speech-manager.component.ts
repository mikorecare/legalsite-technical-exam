import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";

import { HeadNavigationListComponent } from "../components/head-navigation-list/head-navigation-list.component";
import { SpeechListComponent } from "../components/speech-list/speech-list.component";
import { FormTextEditorComponent } from "../components/form-text-editor/form-text-editor.component";
import { GlobalService } from "../services/global.service";
import { PageType } from "../enums";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'speech-manager-component',
    imports: [
        HeadNavigationListComponent,
        SpeechListComponent,
        FormTextEditorComponent,
        CommonModule
    ],
    templateUrl: './speech-manager.component.html',
    styleUrl: './speech-manager.component.scss',
    standalone: true
})
export class SpeechManagerComponent implements OnInit { 

    public pageType$: Observable<PageType>;

    constructor(
        private readonly globalService: GlobalService
    ){ 
        this.pageType$ = this.globalService.pageType$;
    }

    public ngOnInit(): void {
        this.globalService.loadData();
    }
}