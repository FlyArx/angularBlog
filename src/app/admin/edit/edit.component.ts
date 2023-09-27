import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PostsService} from "../shared/services/posts.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription, switchMap} from "rxjs";
import {IPostClient} from "../../shared/interfaces";
import {AlertService} from "../shared/services/alert.service";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnDestroy{

  form: FormGroup
  post: IPostClient
  subbmited = false
  uSub : Subscription
  constructor(private route: ActivatedRoute, private postService: PostsService, private router: Router, private alertService: AlertService) {

  }
  ngOnInit() {
  this.route.params.pipe(switchMap((params)=> {
    return this.postService.getById(params['id'])
  })).subscribe({
    next: (post: IPostClient) => {
      this.post = post
      this.form = new FormGroup({
        title: new FormControl(post.title, Validators.required),
        text: new FormControl(post.text, Validators.required)
      })
    }
  })
  }

  submit() {
    if (this.form.invalid) {
      return
    }
    this.subbmited = true
    this.uSub = this.postService.update({
      ...this.post, title: this.form.value.title, text: this.form.value.text
    }).subscribe({
      next: () => {
        this.alertService.success('Пост изменен 🤡')
        this.router.navigate(['/admin/dashboard'])
      }
    })
    this.subbmited = false

  }

  ngOnDestroy() {
    if(this.uSub) {
      this.uSub.unsubscribe()
    }
  }
}
