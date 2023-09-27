import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {AuthService} from "./shared/auth.service";
import {Router} from "@angular/router";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {


  constructor(private auth: AuthService, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.auth.isAuth && this.auth.token) {
      request = request.clone({
        setParams: {
          auth: this.auth.token
        }
      })
    }
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse  ) => {
        this.auth.logOut()
        this.router.navigate(['/admin/login'], {
          queryParams: {
            authFailed: true
          }
        })
        return throwError(() => err)
      })
    )
  }
}
