import { NgModule } from "@angular/core";
import { MatDialogActions, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
    imports:[
        MatDialogModule,
        MatSnackBarModule,
        MatDialogActions
    ]
})
export class MaterialModule {}