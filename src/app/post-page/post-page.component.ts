import {Component, OnInit} from '@angular/core';
import {Observable , switchMap} from "rxjs";
import { IPostClient} from "../shared/interfaces";
import {ActivatedRoute, Params} from "@angular/router";
import {PostsService} from "../admin/shared/services/posts.service";

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit{
  post$: Observable<IPostClient>

  constructor(private route: ActivatedRoute, private postService: PostsService) {
  }
  ngOnInit(): void {
    this.post$ = this.route.params.pipe(switchMap((p: Params) => {
      return this.postService.getById(p['id'])
    }))
  }

}
