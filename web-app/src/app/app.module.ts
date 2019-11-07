import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef, DoBootstrap } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { environment } from 'src/environments/environment';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { provideRoutes } from '@angular/router';
import { AuthInterceptorService } from './auth.interceptor';

const keycloakService = new KeycloakService();

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: KeycloakService,
      useValue: keycloakService
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  entryComponents: [AppComponent]
})
export class AppModule implements DoBootstrap {
  ngDoBootstrap(appRef: ApplicationRef): void {
    const { keycloakConfig } = environment;

    console.log('ngDoBootstrap');
    keycloakService
      .init({
        config: keycloakConfig,
        initOptions: { onLoad: 'check-sso', checkLoginIframe: false },
        enableBearerInterceptor: false,
        bearerExcludedUrls: [],
        authorizationHeaderName: 'Authorization',
        bearerPrefix: 'Bearer',
        loadUserProfileAtStartUp: true
      })
      .then(() => {
        console.log('[ngDoBootstrap] bootstrap app');

        appRef.bootstrap(AppComponent);
      })
      .catch(error =>
        console.error('[ngDoBootstrap] init Keycloak failed. Message: ', error)
        );
  }
}
