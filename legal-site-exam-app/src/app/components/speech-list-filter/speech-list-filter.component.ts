import { Component } from "@angular/core";
import { Observable } from "rxjs";

import { GlobalService, SpeechFilterService } from "../../services";
import { PageType } from "../../enums";
import { CommonModule } from "@angular/common";

@Component({
    selector: "speech-list-filter-component",
    templateUrl: "./speech-list-filter.component.html",
    imports: [
        CommonModule
    ],
    standalone: true
})
export class SpeechListFilterComponent {

    public pageType$!: Observable<PageType>;
    
    constructor(
        private readonly speechFilterService: SpeechFilterService,
        private readonly globalService: GlobalService
    ) { 
        this.pageType$ = this.globalService.pageType$;
    }

    public onAuthorChange(event: Event): void {
        const target = event.target as HTMLInputElement;

        this.speechFilterService.setAuthor(target.value);
    }

    public onSubjectKeywordChange(event: Event): void {
        const target = event.target as HTMLInputElement;

        this.speechFilterService.setKeywords(target.value);
    }

    public onDateChange(event: Event): void {
        const target = event.target as HTMLInputElement;

        this.speechFilterService.setDate(target.value);
    }
}