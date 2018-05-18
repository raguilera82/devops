import { ConfigProxyServiceFake } from './config-proxy.service.fake';
import { ConfigProxyService } from './config-proxy.service';
import { TestBed, inject } from '@angular/core/testing';

import { ConfigService } from './config.service';

describe('ConfigService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ConfigService,
        {provide: ConfigProxyService, useClass: ConfigProxyServiceFake}
      ]
    });
  });

  it('should be created', inject([ConfigService], (service: ConfigService) => {
    expect(service).toBeTruthy();
  }));

  it('should load configuration', () => {
    const service: ConfigService = TestBed.get(ConfigService);
    service.load();
    console.log(service.config.api);
  });
});
