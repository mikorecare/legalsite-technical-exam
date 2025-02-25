import { Component } from "@angular/core";
import { combineLatest, map, Observable } from "rxjs";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { PageType } from "../../enums/global.page.type.enum";
import { CachedDataService } from "../../services/cached.data.service";
import { SpeechModel } from "../../models/speech.model";
import { GlobalService } from "../../services/global.service";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmModalComponent } from "../../common/modal/confirm/confirm.modal.component";
import { InformationModalComponent } from "../../common/modal/information/information.modal.component";
import { ShareSpeechModalComponent } from "../../common/modal/share-speech/share-speech.modal.component";

@Component({
    selector: "form-text-editor-component",
    templateUrl: "./form-text-editor.component.html",
    styleUrl: "./form-text-editor.component.scss",
    imports: [
        CommonModule,
        FormsModule
    ],
    standalone: true
})
export class FormTextEditorComponent {

    public speeches$: Observable<SpeechModel[]>;
    public speech$: Observable<SpeechModel | undefined>;
    public pageType$!: Observable<PageType>;

    public editedContent: string = "";
    public editedTitle: string = "";
    public originalTitle: string = "";

    private selectedSpeechId: string = "";

    constructor(
        private global: GlobalService,
        private cachedData: CachedDataService,
        private dialog: MatDialog,
    ) {
        this.speeches$ = this.global.speeches$;
        this.pageType$ = this.global.pageType$;

        this.speech$ = combineLatest([this.speeches$, this.global.selectedSpeech$]).pipe(
            map(([speeches, selectedSpeechId]) =>
                speeches.find(speech => speech.id === selectedSpeechId)
            ));

        this.speech$
            .pipe(takeUntilDestroyed())
            .subscribe(speech => {
                this.selectedSpeechId = speech?.id || "";
                this.editedContent = speech?.speechContent || "";
                this.editedTitle = speech?.title || "";
                this.originalTitle = speech?.title || "";
            });

        this.pageType$.pipe(takeUntilDestroyed());
    }

    public onContentChange(event: Event): void {
        const target = event.target as HTMLTextAreaElement;
        this.editedContent = target.value;
    }

    public onTitleChange(event: Event): void {
        const target = event.target as HTMLTextAreaElement;
        this.editedTitle = target.value;
    }

    public onDelete(): void {
        const message: string = `Are you sure you want to delete ${this.originalTitle}?`;

        const dialogRef = this.dialog.open(ConfirmModalComponent, {
            width: '350px',
            data: { message: message },
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
               this.cachedData.deleteSpeech();
            }
        });
    }

    public onSave(): void {
        if (!this.editedContent || !this.editedTitle) {
            this.dialog.open(InformationModalComponent, {
                width: '350px',
                data: { message: 'Please fill-out the title and speech content' },
            });

            return;
        }

        const message: string = this.selectedSpeechId
            ? "Are you sure you want to save this speech?"
            : "Overwrite existing speech?"

        const dialogRef = this.dialog.open(ConfirmModalComponent, {
            width: '350px',
            data: { message: message },
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                const speechContent = this.editedContent;
                const contentTitle = this.editedTitle;

                this.selectedSpeechId
                    ? this.cachedData.updateSpeech(contentTitle, speechContent)
                    : this.cachedData.createSpeech(contentTitle, speechContent);
            }
        });
    }

    public onShare(): void {
        const dialogRef = this.dialog.open(ShareSpeechModalComponent, {
            width: '350px',
            data: { message: "Enter your colleague's email" },
        });
    }
}