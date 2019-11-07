import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResourceThing } from './resourcething.model';
import { KeycloakService } from 'keycloak-angular';

const BASE_URL = 'http://localhost:8080/api';



@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  constructor(
    private http: HttpClient,
    private keyCloak: KeycloakService
  ) { }

  getResource(path: string): Observable<ResourceThing> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      withCredentials: true
    };

    return this.http.get<ResourceThing>(`${BASE_URL}/${path}`, httpOptions);
  }
}
