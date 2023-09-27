import {CanActivateFn, Router, UrlTree} from '@angular/router';
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";
import {inject} from "@angular/core";



export const authGuard: CanActivateFn = (route, state)  => {
  const token = localStorage.getItem('fb-token')
  const router = inject(Router)
  const auth = inject(AuthService)
  if (token) {
  return true
  } else {
    auth.logOut()
    router.navigate(['/admin/login'], {
        queryParams: {
           loginAgain: true
          }
        }); return false
  }




};
