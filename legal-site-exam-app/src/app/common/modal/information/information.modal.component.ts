import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'information-dialog-component',
  templateUrl: './information.modal.component.html',
  imports: [
    MatDialogModule
  ],
  standalone: true
})
export class InformationModalComponent {
  
  constructor(
    public dialogRef: MatDialogRef<InformationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) {}

  public onConfirm(): void {
    this.dialogRef.close(true);
  }
}
