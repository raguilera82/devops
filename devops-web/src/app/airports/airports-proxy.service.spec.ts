import { ConfigProxyService } from './../config/config-proxy.service';
import { ConfigService } from './../config/config.service';
import { ConfigModule } from './../config/config.module';
import { HttpClientModule } from '@angular/common/http';
import { TestBed, inject, async } from '@angular/core/testing';

import { AirportsProxyService } from './airports-proxy.service';
import { ConfigProxyServiceFake } from '../config/config-proxy.service.fake';

describe('AirportsProxyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, ConfigModule],
      providers: [
        AirportsProxyService,
        ConfigService,
        {provide: ConfigProxyService, useClass: ConfigProxyServiceFake}
      ]
    });
  });

  it('should be created', inject([AirportsProxyService], (service: AirportsProxyService) => {
    expect(service).toBeTruthy();
  }));

  xit('should get airports', async(() => {
    const service: AirportsProxyService = TestBed.get(AirportsProxyService);
    const configService: ConfigService = TestBed.get(ConfigService);
    configService.load();
    service.getAirports().subscribe(
      airports => {
        expect(airports).not.toBeNull();
        console.log(airports);
      }
    );
  }));

});
