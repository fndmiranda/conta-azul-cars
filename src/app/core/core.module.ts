import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatCheckboxModule, MatDialogModule, MatSnackBarModule, MatButtonModule, MatInputModule, MatTableModule,
  MatSelectModule
} from '@angular/material';
import { DialogAlertComponent } from './dialog-alert/dialog-alert.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TextMaskModule } from 'angular2-text-mask';
import { PaginationComponent } from './pagination/pagination.component';
import { MediaComponent } from './media/media.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    BrowserAnimationsModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    TextMaskModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatDialogModule,
    MatSnackBarModule,
    MatButtonModule,
    MatTableModule,
    MatInputModule,
    MatSelectModule,
  ],
  exports: [
    RouterModule,
    BrowserAnimationsModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    TextMaskModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatDialogModule,
    MatSnackBarModule,
    MatButtonModule,
    MatTableModule,
    MatInputModule,
    MatSelectModule,
    DialogAlertComponent,
    PaginationComponent,
  ],
  declarations: [
    DialogAlertComponent,
    PaginationComponent,
    MediaComponent,
  ],
  entryComponents: [
    DialogAlertComponent,
    MediaComponent,
  ]
})
export class CoreModule { }
