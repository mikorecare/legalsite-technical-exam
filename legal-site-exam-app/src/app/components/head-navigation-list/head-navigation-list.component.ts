import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Observable } from "rxjs";

import { PageType } from "../../enums/global.page.type.enum";
import { GlobalService, SpeechFilterService } from "../../services";

@Component({
    selector: "head-navigation-list-component",
    templateUrl: "./head-navigation-list.component.html",
    styleUrl: "./head-navigation-list.component.scss",
    imports: [
        CommonModule
    ],
    standalone: true
})
export class HeadNavigationListComponent {

    public pageType$!: Observable<PageType>;

    constructor(
        private readonly globalService: GlobalService,
        private readonly speechFilterService: SpeechFilterService 
    ) { 
        this.pageType$ = this.globalService.pageType$;
    }

    public setPageType(page: keyof typeof PageType): void {
        this.speechFilterService.clearFilters();
        this.globalService.setPageType(PageType[page]);
    }
}