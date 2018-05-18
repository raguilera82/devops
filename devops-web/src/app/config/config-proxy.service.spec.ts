import { HttpClientModule } from '@angular/common/http';
import { async, inject, TestBed } from '@angular/core/testing';

import { ConfigProxyService } from './config-proxy.service';

describe('ConfigProxyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [ConfigProxyService]
    });
  });

  it('should be created', inject([ConfigProxyService], (service: ConfigProxyService) => {
    expect(service).toBeTruthy();
  }));

  it('should get configuration', async(() => {
    const service: ConfigProxyService = TestBed.get(ConfigProxyService);
    service.getConfig().subscribe(
      config => expect(config.api).not.toBeNull()
    );
  }));

});
