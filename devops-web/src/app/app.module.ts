import { AirportsProxyServiceFake } from './airports/airports-proxy.service.fake';
import { AirportsProxyService } from './airports/airports-proxy.service';
import { ConfigProxyService } from './config/config-proxy.service';
import { AirportsModule } from './airports/airports.module';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppComponent } from './app.component';

export function ConfigLoader(configService: ConfigService) {
  return () => configService.load();
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ConfigModule,
    AirportsModule
  ],
  providers: [
    {provide: APP_INITIALIZER, useFactory: ConfigLoader, deps: [ConfigService], multi: true},
    { provide: AirportsProxyService, useClass: AirportsProxyService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
