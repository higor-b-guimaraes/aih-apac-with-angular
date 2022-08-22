import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DialogModel} from "../../unidades/dialog-unidades/dialog-model/dialog-model";

@Component({
  selector: 'app-dialog-motivos',
  templateUrl: './dialog-motivos.component.html',
  styleUrls: ['./dialog-motivos.component.css']
})
export class DialogMotivosComponent implements OnInit {

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
