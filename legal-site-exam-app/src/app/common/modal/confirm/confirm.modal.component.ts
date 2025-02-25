import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'confirm-dialog-component',
  templateUrl: './confirm.modal.component.html',
  imports: [
    MatDialogModule
  ],
  standalone: true
})
export class ConfirmModalComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) {}

  public onConfirm(): void {
    this.dialogRef.close(true);
  }

  public onCancel(): void {
    this.dialogRef.close(false);
  }
}
