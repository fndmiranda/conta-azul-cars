import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogAlertComponent } from '../../core/dialog-alert/dialog-alert.component';
import { CarService } from '../shared/car.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.scss']
})
export class CarDetailComponent implements OnInit {
  form: FormGroup;
  mask = [/[a-zA-Z]/, /[a-zA-Z]/, /[a-zA-Z]/, '-', /\d/, /\d/, /\d/, /\d/];

  constructor(
    public dialogRef: MatDialogRef<CarDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private carService: CarService
  ) { }

  onSubmit() {
    console.log('this.data.item', this.data.item);
    console.log('this.form.value', this.form.value);

    if (this.data.action === 'EDIT') {
      this.carService.update(this.form.value, this.data.item.id)
        .then(
          data => {
            this.dialogRef.close(data);
          },
          err => {
            this.dialog.open(DialogAlertComponent, {
              data: err
            });
          }
        );
    } else if (this.data.action === 'ADD') {
      this.carService.store(this.form.value)
        .then(
          data => {
            this.dialogRef.close(data);
          },
          err => {
            this.dialog.open(DialogAlertComponent, {
              data: err
            });
          }
        );
    }
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      board: [this.data.item.board, [Validators.required, Validators.pattern('^[a-zA-Z]{3}-[0-9]{4}$')]],
      model: [this.data.item.model, [Validators.required]],
      brand: [this.data.item.brand, [Validators.required]],
      image: [this.data.item.image],
      fuel: [this.data.item.fuel],
      value: [this.data.item.value],
    });
  }

}
