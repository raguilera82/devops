import { Observable } from 'rxjs/Observable';
import { AirportsProxyService } from './../airports-proxy.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Airport } from '../airport';

@Component({
  selector: 'app-airport',
  templateUrl: './airport.component.html',
  styleUrls: ['./airport.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AirportComponent implements OnInit {

  airports$: Observable<Airport[]>;

  constructor(private airportsService: AirportsProxyService) { }

  ngOnInit() {
    this.airports$ = this.airportsService.getAirports();
  }

}
