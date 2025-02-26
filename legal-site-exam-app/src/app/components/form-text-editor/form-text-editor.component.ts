import { Component } from "@angular/core";
import { combineLatest, map, Observable } from "rxjs";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from "@angular/material/dialog";

import { ConfirmModalComponent } from "../../common/modal/confirm/confirm.modal.component";
import { InformationModalComponent } from "../../common/modal/information/information.modal.component";
import { ShareSpeechModalComponent } from "../../common/modal/share-speech/share-speech.modal.component";
import { PageType } from "../../enums/global.page.type.enum";
import { 
    GlobalService, 
    CachedDataService, 
    SnackbarService, 
} from "../../services";
import { SpeechListFilterComponent } from "../speech-list-filter/speech-list-filter.component";
import { SpeechModel, UserModel } from "../../models";

@Component({
    selector: "form-text-editor-component",
    templateUrl: "./form-text-editor.component.html",
    styleUrl: "./form-text-editor.component.scss",
    imports: [
    CommonModule,
    FormsModule,
    SpeechListFilterComponent
],
    standalone: true
})
export class FormTextEditorComponent {

    public speeches$: Observable<SpeechModel[]>;
    public speech$: Observable<SpeechModel | undefined>;
    public pageType$!: Observable<PageType>;
    public author$!: Observable<UserModel | undefined>;

    public editedContent: string = "";
    public editedTitle: string = "";
    public originalTitle: string = "";
    public dateModified: Date | string = "";

    private selectedSpeechId: string = "";

    constructor(
        private readonly globalService: GlobalService,
        private readonly cachedData: CachedDataService,
        private readonly dialog: MatDialog,
        private readonly snackBarService: SnackbarService,
    ) {
        this.speeches$ = this.globalService.speeches$;
        this.pageType$ = this.globalService.pageType$;

        this.speech$ = combineLatest([this.speeches$, this.globalService.selectedSpeech$]).pipe(
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
                this.dateModified = speech?.dateModified || "";
            });
        
        this.author$ = combineLatest([
            this.globalService.users$,
            this.speech$
        ]).pipe(
            map(([users, speech]) => users.find(user => user.id === speech?.authorId))
        );
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
            data: { 
                title: "Delete Speech",
                message: message 
            },
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
                data: { 
                    message: 'Please fill-out the title and speech content' 
                },
            });

            return;
        }

        const message: string = this.selectedSpeechId
            ? "Overwrite existing speech?"
            : "Are you sure you want to save this speech?"
            
        const dialogRef = this.dialog.open(ConfirmModalComponent, {
            width: '350px',
            data: { 
                title: "Save Speech",
                message: message 
            },
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

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.snackBarService.info("Email sent successfully");
            }
        });
    }
}