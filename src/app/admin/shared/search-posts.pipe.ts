import { Pipe, PipeTransform } from '@angular/core';
import {IPostClient} from "../../shared/interfaces";

@Pipe({
  name: 'searchPosts'
})
export class SearchPostsPipe implements PipeTransform {

  transform(posts: IPostClient[], search:string|null = ''): IPostClient[] {
    if ( !search!.trim()) {
      return posts
    }
    return posts.filter(post => post.title.toLowerCase().includes(search!.toLowerCase()))

  }

}
