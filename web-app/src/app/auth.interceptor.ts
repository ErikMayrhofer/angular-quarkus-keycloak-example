import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { KeycloakService } from 'keycloak-angular';
import { mergeMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(
    private keycloak: KeycloakService
  ) {
    console.log('HEYYY!!');
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('HEYYY222!!');
    return from(this.keycloak.isLoggedIn()).pipe(
      mergeMap(loggedIn => {
        if (loggedIn) {
          return this.keycloak.addTokenToHeader(req.headers).pipe(
            mergeMap(headersWithBearer => {
              const clonedReq = req.clone({ headers: headersWithBearer });
              return next.handle(clonedReq);
            })
          );
        } else {
          return next.handle(req);
        }
      })
    );
  }
}
