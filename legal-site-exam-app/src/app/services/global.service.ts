import { Injectable } from "@angular/core";
import { BehaviorSubject, combineLatest, Observable } from "rxjs";
import { map, shareReplay, tap, take } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";

import { PageType } from "../enums/global.page.type.enum";
import { SnackbarService } from "./snackbar.service";
import { SpeechFilterService } from "./speech.filter.service";
import { UserModel, SpeechModel } from "../models";

@Injectable({
    providedIn: "root"
})
export class GlobalService {
    private usersSubject = new BehaviorSubject<UserModel[]>([]);
    private speechesSubject = new BehaviorSubject<SpeechModel[]>([]);
    private selectedSpeechSubject = new BehaviorSubject<string>("");
    private selectedUserIdSubject = new BehaviorSubject<string>("user-002");
    private pageTypeSubject = new BehaviorSubject<PageType>(PageType.VIEW);

    public users$ = this.usersSubject.asObservable();
    public speeches$ = this.speechesSubject.asObservable();
    public selectedSpeech$ = this.selectedSpeechSubject.asObservable();
    public selectedUserId$ = this.selectedUserIdSubject.asObservable();
    public pageType$ = this.pageTypeSubject.asObservable();

    public filteredSpeeches$;

    constructor(
        private readonly httpClient: HttpClient,
        private readonly snackBar: SnackbarService,
        private readonly speechFilterService: SpeechFilterService
    ) { 
        this.filteredSpeeches$ = this.setFilteredSpeeches();
    }

    public loadData(): void {
        if (this.usersSubject.value.length === 0) {
            this.httpClient.get<UserModel[]>("/json-data/users.data.json")
                .pipe(tap((users: UserModel[]) => this.usersSubject.next(users)))
                .subscribe();
            
            this.snackBar.success("Data Loaded Successfully");
        }

        if (this.speechesSubject.value.length === 0) {
            this.httpClient.get<SpeechModel[]>("/json-data/speech.data.json")
                .pipe(
                    tap((speeches: SpeechModel[]) => {
                        this.speechesSubject.next(speeches);
                        this.setPageType(PageType.VIEW);
                    })
                )
                .subscribe();
        }
    }

    public createSpeech(newSpeech: SpeechModel): void {
        try{
            const updatedSpeeches = [...this.speechesSubject.value, newSpeech];
            this.speechesSubject.next(updatedSpeeches);
            this.snackBar.success("Speech Saved");
        } catch {
            this.snackBar.error("Something went wrong");
        }
        
    }

    public async updateSpeeches(updatedSpeeches: SpeechModel[], isSaving: boolean = true): Promise<void> {
        try {
            this.speechesSubject.next(updatedSpeeches);
            isSaving ? this.snackBar.success("Speech Saved") : this.snackBar.warning("Speech Deleted");
        } catch {
            this.snackBar.error("Something went wrong");
        }
    }

    public setSelectedUserId(userId: string): void {
        this.selectedUserIdSubject.next(userId);
    }

    public setSelectedSpeechId(selectedSpeechId: string): void {
        this.selectedSpeechSubject.next(selectedSpeechId);
    }

    public setPageType(pageType: PageType): void {
        this.pageTypeSubject.next(pageType);

        if (pageType === PageType.ALL) {
            this.speeches$.pipe(take(1)).subscribe(speeches => {
                this.setSelectedSpeechId(speeches.length > 0 ? speeches[0].id : "");
            });
        } else {
            this.filteredSpeeches$.pipe(take(1)).subscribe(speeches => {
                this.setSelectedSpeechId(pageType === PageType.VIEW && speeches.length > 0 ? speeches[0].id : "");
            });
        }
    }

    private setPageSpeeches(speeches: SpeechModel[], selectedUserId: string, pageType: PageType): SpeechModel[] {

        switch (pageType) {
            case PageType.VIEW:
                return speeches.filter(speech => speech.authorId === selectedUserId);
            case PageType.ALL:
                return speeches;
            case PageType.ADD:
                return [];
            default:
                return [];
        }
    }

    private setFilteredSpeeches(): Observable<SpeechModel[]> {
        return combineLatest([
            this.speeches$,
            this.selectedUserId$,
            this.pageType$,
            this.speechFilterService.author$,
            this.speechFilterService.keywords$,
            this.speechFilterService.date$,
            this.users$
        ]).pipe(
            map(([speeches, selectedUserId, pageType, author, keywords, date, users]) => {
                let filteredSpeeches = this.setPageSpeeches(speeches, selectedUserId, pageType);

                const speechesWithAuthor = filteredSpeeches.map(speech => ({
                    ...speech,
                    authorName: users
                        .filter(user => user.id === speech.authorId)
                        .map(user => `${user.firstName} ${user.lastName}`)
                        .join('') || 'Unknown User'
                }));

                if (author) {
                    filteredSpeeches = speechesWithAuthor.filter(s => 
                        s.authorName.toLowerCase().includes(author.toLowerCase())
                    );
                }
                if (keywords) {
                    filteredSpeeches = filteredSpeeches.filter(s => 
                        s.title.toLowerCase().includes(keywords.toLowerCase()) ||
                        s.speechContent.toLowerCase().includes(keywords.toLowerCase())
                    );
                }
                if (date) {
                    filteredSpeeches = filteredSpeeches.filter(s => s.dateCreated.includes(date));
                }

                const checkId = filteredSpeeches.find(speech => this.selectedSpeechSubject.getValue());
          
                if (!checkId) {
                    this.setSelectedSpeechId(filteredSpeeches[0]?.id);
                }

                if (checkId && filteredSpeeches.includes(checkId)) {
                    this.setSelectedSpeechId(checkId.id);
                }

                return filteredSpeeches;
            }),
            shareReplay(1)
        );
    }
}
