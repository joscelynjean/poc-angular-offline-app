import { HttpCachingInterceptor } from './interceptors/http-caching.interceptor';
import { Configuration } from './swagger-generated/configuration';
import { ApiModule } from './swagger-generated/api.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { DexieService } from './dexie/dexie.service';

function ApiConfigurationFactory() {
  const apiConfiguration: Configuration = new Configuration({
    basePath: 'http://localhost:8080'
  });
  return apiConfiguration;
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ApiModule.forRoot(ApiConfigurationFactory)
  ],
  providers: [
    // Caching
    DexieService,
    // Add caching interceptor
    { provide: HTTP_INTERCEPTORS, useClass: HttpCachingInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
