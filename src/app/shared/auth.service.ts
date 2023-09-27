import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {IFbAuthResponce, IUser} from "./interfaces";
import {catchError, Observable, Subject, tap, throwError} from "rxjs";
import {environments} from "../../enviroments/enviroment";

@Injectable()
export class AuthService {

  public erorr$:  Subject<string> =  new Subject<string>()
  constructor(private http: HttpClient) { }

  get token(): string | null {
    const expTokenDate = new Date(localStorage.getItem('fb-token-exp') as string)
    if (new Date() > expTokenDate) {
      this.logOut()
      return null
    }
    return localStorage.getItem('fb-token')
  }
  logIn(user: IUser) : Observable<any> {
   return this.http.post<any>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environments.apiKey}`, user)
     .pipe(
       tap<any>(this.setToken),
       catchError(err => this.handleError(err))

     )
  }

  //INVALID_LOGIN_CREDENTIALS не зареган
  logOut() {
  this.setToken(null)
  }
  get isAuth():boolean {
    return !!this.token
  }
  private handleError(e: HttpErrorResponse) {
  const {message} = e.error.error
    console.log(message)
  switch (message) {
    case 'INVALID_LOGIN_CREDENTIALS':
      this.erorr$.next('Что-то пошло не так')
      break
    case 'TOO_MANY_ATTEMPTS_TRY_LATER':
      this.erorr$.next('слишком много попыток, попробуйте позже')
      break
  }
    return throwError(() => new Error(message))

  }

  // IFbAuthResponce type ↓
  private setToken(res: IFbAuthResponce | null ) {
    if (res) {
    const expDate = new Date(new Date().getTime() + +res.expiresIn * 1000)
    localStorage.setItem('fb-token', res.idToken)
    localStorage.setItem('fb-token-exp', expDate.toString())
    } else {
    localStorage.clear()
    }
  }

}
