import { Component } from "@angular/core";
import { GlobalService } from "../../services/global.service";
import { SpeechModel } from "../../models/speech.model";
import { Observable } from "rxjs";
import { CommonModule } from "@angular/common";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";


@Component({
    selector: "speech-list-component",
    templateUrl: "./speech-list.component.html",
    styleUrl: "./speech-list.component.scss",
    imports: [
        CommonModule
    ],
    standalone: true
})
export class SpeechListComponent {

    public speeches$: Observable<SpeechModel[]>;

    constructor(
        private global: GlobalService
    ) {
        this.speeches$ = this.global.filteredSpeeches$;

        this.speeches$.pipe(takeUntilDestroyed());
    }

    public selectedSpeechId(selectedSpeechId: string): void {
        this.global.setSelectedSpeechId(selectedSpeechId);
    }
}