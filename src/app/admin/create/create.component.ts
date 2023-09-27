import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {IPostClient} from "../../shared/interfaces";
import {PostsService} from "../shared/services/posts.service";
import {AlertService} from "../shared/services/alert.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent  implements OnInit, OnDestroy{
  form: FormGroup
  cSub: Subscription

constructor(private postService: PostsService, private  alertService: AlertService, private router: Router) {
}
  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      text: new FormControl(null, [Validators.required]),
      author: new FormControl(null, [Validators.required])
    })
  }

  OnSubmit() {
    if (this.form.invalid) {
      return
    }
    const post: IPostClient = {
      // title: this.form.get('title')?.value,
      title: this.form.value.title,
      author: this.form.value.author,
      text: this.form.value.text,
      date: new Date()
    }
    this.cSub = this.postService.create(post).subscribe({
      next: () => {
        this.form.reset()
        this.router.navigate(['/admin/dashboard'])
        this.alertService.success('Пост создан 🤡')
      }
    })


  }
  ngOnDestroy() {
    if (this.cSub) {
      this.cSub.unsubscribe()
    }
  }
}
