import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResourceThing } from './resourcething.model';
import { KeycloakService } from 'keycloak-angular';
import { Userstuff } from './userstuff.model';

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

  getStuff(): Observable<Userstuff[]> {
    return this.http.get<Userstuff[]>(`${BASE_URL}/user`);
  }

  getAllStuff(): Observable<Userstuff[]> {
    return this.http.get<Userstuff[]>(`${BASE_URL}/stuff`);
  }

  postResource(path: string): Observable<any> {
    return this.http.post(`${BASE_URL}/${path}`, null);
  }

}
