import { Configuration } from './swagger-generated/configuration';
import { ApiModule } from './swagger-generated/api.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
