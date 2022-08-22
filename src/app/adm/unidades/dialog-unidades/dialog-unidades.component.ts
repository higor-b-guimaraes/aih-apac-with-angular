import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DialogModel} from './dialog-model/dialog-model';

@Component({
  selector: 'app-dialog-unidades',
  templateUrl: './dialog-unidades.component.html',
  styleUrls: ['./dialog-unidades.component.css']
})
export class DialogUnidadesComponent implements OnInit {

  title: string = "";

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:DialogModel,
    public dialogRef: MatDialogRef<DialogModel>,
  ) { }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogRef.close(false);
  }

  confirmDialog() {
    this.dialogRef.close(true);
  }

}
