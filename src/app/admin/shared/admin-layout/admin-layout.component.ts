import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../../shared/auth.service";

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent {

  constructor( private router: Router, public auth: AuthService) {
  }
  logOut(event: Event) {

     event.preventDefault()
    this.auth.logOut()
    this.router.navigate(['/admin'])
  }
}
