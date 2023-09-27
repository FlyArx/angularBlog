import { Component } from '@angular/core';
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss']
})
export class AppLayoutComponent {

  constructor(public auth: AuthService) {
  }


}
