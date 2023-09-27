import {Component, OnInit} from '@angular/core';
import {PostsService} from "../admin/shared/services/posts.service";
import {Observable} from "rxjs";
import {IPostClient} from "../shared/interfaces";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit{

  posts$: Observable<IPostClient[]>
constructor(private postService: PostsService) {
}

ngOnInit() {
    this.posts$ = this.postService.getAll()
}

}
