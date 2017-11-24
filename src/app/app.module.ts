import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { CarsModule } from './cars/cars.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    CarsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
