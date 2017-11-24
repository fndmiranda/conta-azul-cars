import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Car } from '../car';
import { CarService } from '../shared/car.service';
import { CarDetailComponent } from '../car-detail/car-detail.component';
import { Pagination } from '../../core/pagination';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MediaComponent } from '../../core/media/media.component';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss']
})
export class CarListComponent implements OnInit {
  form: FormGroup;
  matTableDataSource = new MatTableDataSource<Car>();
  selection = new SelectionModel<Car>(true, []);
  pagination: Pagination;

  constructor(
    private carService: CarService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
  ) { }

  open(event, action: string, item: any = {}) {
    const dialogRef = this.dialog.open(CarDetailComponent, {
      panelClass: ['dialog-medium', 'dialog-fullscreen'],
      data: {
        item: JSON.parse(JSON.stringify(item)),
        action: action,
      }
    });

    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        if (action === 'EDIT') {
          const index = this.matTableDataSource.data.findIndex(value => value.id === data.id);
          this.matTableDataSource.data[index] = data;
          this.snackBar.open('Carro atualizado com sucesso!', 'OK', {
            duration: 3000
          });
        } else if (action === 'ADD') {
          this.getCars();
          this.router.navigate([''], {queryParams: {page: 1}});
          this.snackBar.open('Carro criado com sucesso!', 'OK', {
            duration: 3000
          });
        }
      }
    });
  }

  media(event, item: any = {}) {
    event.stopPropagation();
    const dialogRef = this.dialog.open(MediaComponent, {
      panelClass: ['dialog-medium', 'dialog-fullscreen'],
      data: {
        item: JSON.parse(JSON.stringify(item)),
      }
    });
  }

  isAllFilteredRowsSelected() {
    return this.matTableDataSource.filteredData.every(data => this.selection.isSelected(data));
  }

  isMasterToggleChecked() {
    return this.selection.hasValue() &&
      this.isAllFilteredRowsSelected() &&
      this.selection.selected.length >= this.matTableDataSource.filteredData.length;
  }

  isMasterToggleIndeterminate() {
    return this.selection.hasValue() &&
      (!this.isAllFilteredRowsSelected() || !this.matTableDataSource.filteredData.length);
  }

  masterToggle() {
    if (this.isMasterToggleChecked()) {
      this.selection.clear();
    } else {
      this.matTableDataSource.filteredData.forEach(data => this.selection.select(data));
    }
  }

  remove(event, data) {
    this.carService.destroy(data).then((response: any) => {
      this.selection.clear();
      this.getCars();
    });
  }

  getCars() {
    this.route
      .queryParams
      .subscribe(params => {
        this.carService.index({
          page: params['page'] || 1,
          search: this.form.get('search').value
        }).then((response: any) => {
          this.matTableDataSource.data = response.data;
          this.pagination = response.meta.pagination;
        });
      });
  }

  onSearch() {
    this.getCars();
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      search: [null]
    });

    this.getCars();
  }
}
