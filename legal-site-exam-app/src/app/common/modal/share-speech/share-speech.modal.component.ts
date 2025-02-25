import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'share-speech-dialog-component',
  templateUrl: './share-speech.modal.component.html',
  imports: [
    MatDialogModule,
    FormsModule
  ],
  standalone: true
})
export class ShareSpeechModalComponent {

  private emailPattern: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  public email!: string;

  public get isValidEmail(): boolean {
    return this.email !== '' && !this.emailPattern.test(this.email);
  }
  
  constructor(
    public dialogRef: MatDialogRef<ShareSpeechModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) {}

  public onConfirm(): void {
    this.dialogRef.close(true);
  }
}
