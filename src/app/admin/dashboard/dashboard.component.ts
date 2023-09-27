import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostsService} from "../shared/services/posts.service";
import {IPostClient} from "../../shared/interfaces";
import {Subscription} from "rxjs";
import {FormControl, Validators} from "@angular/forms";
import {AlertService} from "../shared/services/alert.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy{

  posts: IPostClient[] = []
  pSub: Subscription
  searchControl: FormControl<string|null> = new FormControl('')
  dSub: Subscription
  constructor(private postService: PostsService, private alertService: AlertService) {

  }

  ngOnInit(): void {
   this.pSub = this.postService.getAll().subscribe({
    next:(posts) => {
      this.posts = posts
    }
  })


  }
  remove(id: any  ) {
  this.dSub =  this.postService.remove(id).subscribe(
      {next:
          () => {
            this.posts = this.posts.filter(p => p.id !== id)
            this.alertService.success('Пост удален 🤡')
          }


      })
  }
  ngOnDestroy(): void {
    if (this.pSub) {
      this.pSub.unsubscribe()
    }
    if (this.dSub) {
      this.dSub.unsubscribe()
    }
  }


}
