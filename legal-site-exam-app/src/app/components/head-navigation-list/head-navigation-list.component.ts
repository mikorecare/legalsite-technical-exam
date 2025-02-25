import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Observable } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

import { GlobalService } from "../../services/global.service";
import { PageType } from "../../enums/global.page.type.enum";

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
        private globalService: GlobalService
    ) { 
        this.pageType$ = this.globalService.pageType$;
        this.pageType$.pipe(takeUntilDestroyed());
    }

    public setPageType(page: keyof typeof PageType): void {
        this.globalService.setPageType(PageType[page]);
    }
}