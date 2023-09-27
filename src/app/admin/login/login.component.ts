import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {IUser} from "../../shared/interfaces";
import {AuthService} from "../../shared/auth.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {AlertService} from "../shared/services/alert.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

 form: FormGroup
  loading = false
  failLogin: string

constructor(public auth: AuthService, private router: Router, private  route: ActivatedRoute, private alertService: AlertService) {
}
  ngOnInit() {
   this.route.queryParams.subscribe((p: Params) => {
     if (p['loginAgain']) {
        this.failLogin = 'Необходимо авторизоваться'
     }
     if (p['authFailed']) {
       this.failLogin = 'Необходимо авторизоваться'
     }
   })
   this.form = new FormGroup({
     email: new FormControl(null, [Validators.email, Validators.required]),
     password: new FormControl(null, [Validators.required, Validators.minLength(6) ])
   })
  }

  onSubmit() {


    if (this.form.invalid) {
      return
    }
    this.loading = true
    const user: IUser = {
      email: this.form.value.email,
      password: this.form.value.password,
      returnSecureToken: true
    }
    this.auth.logIn(user).subscribe(
      {
        next: () => {

          this.form.reset()
             this.router.navigate(['/admin/dashboard'])
             this.loading = false
        },
        error: () => {
          this.loading = false
          this.alertService.warning('LOGIN: test@test.com | PASS: qwerty1')
        }
      }
    )


  }
}
