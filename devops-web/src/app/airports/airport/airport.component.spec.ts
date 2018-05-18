import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AirportsProxyService } from './../airports-proxy.service';
import { AirportsProxyServiceFake } from './../airports-proxy.service.fake';
import { AirportComponent } from './airport.component';

describe('AirportComponent', () => {
  let component: AirportComponent;
  let fixture: ComponentFixture<AirportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AirportComponent ],
      providers: [
        {provide: AirportsProxyService, useClass: AirportsProxyServiceFake}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AirportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set airports', () => {
    component.ngOnInit();
    component.airports$.subscribe(
      airports => {
        expect(airports).not.toBeNull();
        expect(airports[0].code).toEqual('MAD');
        expect(airports[1].city.id).toBe(3);
      }
    );
  });

});
