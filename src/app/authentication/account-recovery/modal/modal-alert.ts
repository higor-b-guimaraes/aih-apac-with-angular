import {Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AccountRecoveryComponent } from '../account-recovery.component';



@Component({
  selector: 'modal-alert',
  templateUrl: './modal-alert.html',
  styleUrls: ['./modal-alert.css'],
})
export class ModalAlert {
  constructor(
    public dialogRef: MatDialogRef<ModalAlert>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    console.log((data['cpf']))
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
