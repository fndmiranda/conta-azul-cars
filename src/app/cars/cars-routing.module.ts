import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarListComponent } from './car-list/car-list.component';

const routes: Routes = [
  {
    path: '',
    component: CarListComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ]
})
export class CarsRoutingModule {
}
