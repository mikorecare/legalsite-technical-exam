import { Injectable } from "@angular/core";
import { BehaviorSubject, combineLatest, firstValueFrom } from "rxjs";
import { map, shareReplay, tap, take } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { SpeechModel } from "../models/speech.model";
import { UserModel } from "../models/user.model";
import { PageType } from "../enums/global.page.type.enum";
import { SnackbarService } from "./snackbar.service";

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
    public selectedUser$ = this.selectedUserIdSubject.asObservable();
    public pageType$ = this.pageTypeSubject.asObservable();

    public filteredSpeeches$ = combineLatest([
        this.speeches$,
        this.selectedUser$,
        this.pageType$
    ]).pipe(
        map(([speeches, selectedUserId, pageType]) => this.setPageSpeeches(speeches, selectedUserId, pageType)),
        shareReplay(1)
    );

    constructor(
        private readonly httpClient: HttpClient,
        private readonly snackBar: SnackbarService
    ) { }

    public loadData(): void {
        if (this.usersSubject.value.length === 0) {
            this.httpClient.get<UserModel[]>("/json-data/users.data.json")
                .pipe(tap(users => this.usersSubject.next(users)))
                .subscribe();
            
            this.snackBar.success("Data Loaded Successfully");
        }

        if (this.speechesSubject.value.length === 0) {
            this.httpClient.get<SpeechModel[]>("/json-data/speech.data.json")
                .pipe(
                    tap(speeches => {
                        this.speechesSubject.next(speeches);
                        this.setPageType(PageType.VIEW);
                    })
                )
                .subscribe();
        }
    }

    public createSpeech(newSpeech: SpeechModel): void {
        const updatedSpeeches = [...this.speechesSubject.value, newSpeech];
        this.speechesSubject.next(updatedSpeeches);
    }

    public async updateSpeeches(updatedSpeeches: SpeechModel[]): Promise<void> {
        this.speechesSubject.next(updatedSpeeches);
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
}
