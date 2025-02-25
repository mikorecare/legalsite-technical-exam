import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
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
export class SpeechListFilterComponent implements OnInit {

    @ViewChild('authorInput') authorInput!: ElementRef;
    @ViewChild('subjectInput') subjectInput!: ElementRef;
    @ViewChild('dateInput') dateInput!: ElementRef;

    public pageType$!: Observable<PageType>;

    constructor(
        private readonly speechFilterService: SpeechFilterService,
        private readonly globalService: GlobalService
    ) {
        this.pageType$ = this.globalService.pageType$;
    }

    public ngOnInit(): void {
        this.pageType$.subscribe(() => {
            setTimeout(() => {
                this.clearInputs();
            });
        });
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

    private clearInputs(): void {
        if (this.authorInput) this.authorInput.nativeElement.value = '';
        if (this.subjectInput) this.subjectInput.nativeElement.value = '';
        if (this.dateInput) this.dateInput.nativeElement.value = '';
    }
}