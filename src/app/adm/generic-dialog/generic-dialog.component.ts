import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { DialogModel } from "./generic-dialog-model/generic-dialog"

@Component({
  selector: 'app-generic-dialog.ts',
  templateUrl: './generic-dialog.component.html',
  styleUrls: ['./generic-dialog.component.css']
})
export class GenericDialogComponent implements OnInit {

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
