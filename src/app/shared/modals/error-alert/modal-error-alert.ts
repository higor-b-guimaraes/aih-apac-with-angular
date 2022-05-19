import {Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'modal-alert',
  templateUrl: './modal-alert.html',
  styleUrls: ['./modal-alert.css'],
})
export class ModalAlert {
  constructor(
    public dialogRef: MatDialogRef<ModalAlert>,
    @Inject(MAT_DIALOG_DATA) public message: any,
  ) {
    console.log((message['bodyErrorMessage']))
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
