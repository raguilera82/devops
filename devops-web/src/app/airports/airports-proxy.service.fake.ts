import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Airport } from './airport';

@Injectable()
export class AirportsProxyServiceFake {

  constructor() { }

  getAirports(): Observable<Airport[]> {
    return of(AIRPORTS_FAKE);
  }

}

const AIRPORTS_FAKE: Airport[] = [
  {
    'code': 'MAD',
    'name': 'Madrid Barajas',
    'city': {
      'id': 2,
      'name': 'Madrid'
    }
  },
  {
    'code': 'BIO',
    'name': 'Sondika',
    'city': {
      'id': 3,
      'name': 'Bilbao'
    }
  }
];
