import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Config } from './config';

@Injectable()
export class ConfigProxyServiceFake {

  constructor() { }

  getConfig(): Observable<Config> {
    return of(CONFIG_FAKE);
  }

}

const CONFIG_FAKE: Config = {
  'api': 'http://devops-ci:8050/'
};

