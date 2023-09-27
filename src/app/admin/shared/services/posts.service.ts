import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable, tap} from "rxjs";
import {IPost, IPostClient} from "../../../shared/interfaces";
import {environments} from "../../../../enviroments/enviroment";



@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) {
  }


  create(post: IPostClient): Observable<IPostClient> {
    return this.http.post<IPost>(`${environments.DbURL}/posts.json`, post)
      .pipe(
      map(id => ({...post, id: id.name, date: new Date(post.date)})),
    )
  }
  getAll(): Observable<IPostClient[]> {
    return this.http.get<IPost[]>(`${environments.DbURL}/posts.json`).pipe(
      map((res: {[key: string]: any}) => {
        return Object.keys(res).map(key => ({
          ...res[key],
          id: key,
          date: new Date(res[key].date)
        }))
      })
    )
  }
  getById(id: string): Observable<IPostClient> {
   return this.http.get<IPostClient>(`${environments.DbURL}/posts/${id}.json`)
     .pipe(map(post => {
       return {...post, id, date: new Date(post.date)}
     }))

  }
  update(post: IPostClient): Observable<IPostClient> {
    return this.http.patch<IPostClient>(`${environments.DbURL}/posts/${post.id}.json`, post)
  }
  remove(id: string| null) : Observable<void> {
   return this.http.delete<void>(`${environments.DbURL}/posts/${id}.json`)
  }
}
