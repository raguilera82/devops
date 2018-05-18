import { Injectable } from '@angular/core';

import { Config } from './config';
import { ConfigProxyService } from './config-proxy.service';

@Injectable()
export class ConfigService {

  config: Config;

  constructor(private proxy: ConfigProxyService) { }

  load() {
    return new Promise((resolve) => {
      this.proxy.getConfig().subscribe(
        config => {
          this.config = config;
          resolve();
        }
      );
    });
  }

}
