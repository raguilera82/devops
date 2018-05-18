import { Config } from './config';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http';

@Injectable()
export class ConfigProxyService {

  constructor(private httpClient: HttpClient) { }

  getConfig(): Observable<Config> {
    return this.httpClient.get<Config>(`${environment.configFile}`);
  }

}
