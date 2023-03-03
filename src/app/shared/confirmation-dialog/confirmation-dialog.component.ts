import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

export interface IConfirmationDialogData {
  cancelText: string,
  confirmText: string,
  message: string,
  title: string
}

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})

export class ConfirmationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IConfirmationDialogData
  ){}

  cancel() {
    this.close(false);
  }

  close(value: boolean) {
    this.dialogRef.close(value);
  }

  confirm() {
    this.close(true);
  }

}
