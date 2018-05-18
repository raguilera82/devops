import { ConfigProxyService } from './config-proxy.service';
import { ConfigService } from './config.service';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [],
  providers: [ConfigService, ConfigProxyService]
})
export class ConfigModule { }
