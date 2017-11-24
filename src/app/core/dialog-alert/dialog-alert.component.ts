import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-dialog-alert',
  templateUrl: './dialog-alert.component.html',
  styleUrls: ['./dialog-alert.component.scss']
})
export class DialogAlertComponent {

  constructor(
      public dialogRef: MatDialogRef<DialogAlertComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

}
