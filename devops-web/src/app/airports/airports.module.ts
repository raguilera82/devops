import { AirportsProxyService } from './airports-proxy.service';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AirportComponent } from './airport/airport.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [AirportComponent],
  providers: [AirportsProxyService],
  exports: [AirportComponent]
})
export class AirportsModule { }
