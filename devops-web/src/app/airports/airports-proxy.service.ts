import { ConfigService } from './../config/config.service';
import { Airport } from './airport';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AirportsProxyService {

  constructor(private httpClient: HttpClient,
              private configService: ConfigService) { }

  getAirports(): Observable<Airport[]> {
    return this.httpClient.get<Airport[]>(`${this.configService.config.api}airport`);
  }

}
