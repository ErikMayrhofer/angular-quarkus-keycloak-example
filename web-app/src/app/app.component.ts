import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { ResourceService } from './resource.service';
import { Userstuff } from './userstuff.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'web-app';

  constructor(
    private keycloak: KeycloakService,
    private resourceService: ResourceService
  ) {}

  user: KeycloakProfile;
  roles: string[] = [];
  response: string;
  token: string;
  userstuff: Array<Userstuff>;
  allstuff: Array<Userstuff>;

  sendPath(path: string): void {
    this.resourceService.getResource(path).subscribe(p => {
      console.log(p);
    });
  }

  ngOnInit(): void {
    this.keycloak.isLoggedIn().then(loggedIn => {
      if (loggedIn) {
        this.keycloak.loadUserProfile().then(userProfile => {
          this.user = userProfile;
        });
        this.roles = this.keycloak.getUserRoles();
        this.keycloak.getToken().then(token => {
          this.token = token;
        });
        this.refreshStuff();
      }
    });
  }

  refreshStuff() {
    this.resourceService.getStuff().subscribe(stuff => {
      this.userstuff = stuff;
    });
    this.resourceService.getAllStuff().subscribe(allstuff => {
      this.allstuff = allstuff;
    });
  }

  login() {
    this.keycloak.login();
  }

  logout() {
    this.keycloak.logout();
  }

  testRole(role: string) {
    const allowed = this.keycloak.isUserInRole(role);
    if (allowed) {
      alert('Ok');
    }
  }

  resource(path: string) {
    this.response = '';
    this.resourceService.getResource(path).subscribe(it => {
      this.response = it.string;
    });
  }

  postPath(path: string) {
    this.resourceService.postResource(path).subscribe(response => {
      console.log(response);
    });
  }

  addStuff() {
    this.resourceService.postResource('user').subscribe(response => {
      this.refreshStuff();
    });
  }
}
