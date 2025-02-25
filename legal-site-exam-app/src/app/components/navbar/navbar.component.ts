import { Component, OnInit } from '@angular/core';
import { combineLatest, filter, map, Observable } from 'rxjs';
import { UserModel } from '../../models';
import { GlobalService } from '../../services';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'navbar-component',
    templateUrl: './navbar.component.html',
    styleUrl: "./navbar.component.scss",
    imports: [
        CommonModule
    ]
})
export class UserNavComponent implements OnInit {

    public users$!: Observable<UserModel[]>;
    public selectedUser$!: Observable<UserModel | undefined>;

    constructor(private globalService: GlobalService) {
        
    }

    public ngOnInit(): void {
        this.users$ = this.globalService.users$;
    
        this.selectedUser$ = combineLatest([
            this.globalService.users$,
            this.globalService.selectedUserId$
        ]).pipe(
            map(([users, selectedUserId]) => users.find(user => user.id === selectedUserId))
        );
    }

    public selectUser(user: string): void {
        this.globalService.setSelectedUserId(user);
    }
}
