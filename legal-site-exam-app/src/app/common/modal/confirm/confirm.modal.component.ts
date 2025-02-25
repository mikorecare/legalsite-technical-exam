import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

import { AlertType } from '../../../enums';

@Component({
  selector: 'confirm-dialog-component',
  templateUrl: './confirm.modal.component.html',
  styleUrl:"./confirm.modal.component.scss",
  imports: [
    MatDialogModule
  ],
  standalone: true
})
export class ConfirmModalComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title:string, message: string }
  ) {}

  public onConfirm(): void {
    this.dialogRef.close(true);
  }

  public onCancel(): void {
    this.dialogRef.close(false);
  }
}
