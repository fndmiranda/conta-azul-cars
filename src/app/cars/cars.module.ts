import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarListComponent } from './car-list/car-list.component';
import { CoreModule } from '../core/core.module';
import { CarsRoutingModule } from './cars-routing.module';
import { CarService } from './shared/car.service';
import { CarDetailComponent } from './car-detail/car-detail.component';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    CarsRoutingModule,
  ],
  declarations: [
    CarListComponent,
    CarDetailComponent,
  ],
  entryComponents: [
    CarDetailComponent,
  ],
  providers: [
    CarService,
  ]
})
export class CarsModule { }
