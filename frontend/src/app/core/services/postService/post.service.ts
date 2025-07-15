import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  public Url = 'http://localhost:'
  public Port = 3000

  constructor( private http : HttpClient ) { }


  create( payload : any ){
    console.log('payload in create post===', payload)
    return this.http.post(`${this.Url}${this.Port}/post/create`, payload)
  }

  display(){
    return this.http.get(`${this.Url}${this.Port}/post/display`)
  }

  delete(payload : any){
    return this.http.delete(`${this.Url}${this.Port}/post/delete/${payload}`)
  }

  //SAVE POST FEATURE=====

  savePost(postId : any, userId : any){
    const payload = { postId, userId }
    return this.http.post(`${this.Url}${this.Port}/post/save`, payload)
  }

  getAllSave(userId : any){
    return this.http.get(`${this.Url}${this.Port}/post/getAllSave/${userId}`)
  }

  // unsavePost(postId : any, userId : any){
  //   const payload = { postId, userId }
  //   return this.http.delete(`${this.Url}${this.Port}/post/save`, payload)
  // }


  //===== LIKE COMMENT FEATURE=====


  likePost(postId : any, userId : any){
    const payload = {postId, userId}

    return this.http.post(`${this.Url}${this.Port}/post/like`, payload)
  }

  // unlikePost(postId : any, userId : any){
  //   const payload = {postId, userId}

  //   return this.http.delete(`${this.Url}${this.Port}/post/like`, payload)
  // }

  comment(postId : any, userId : any){
    const payload = {postId, userId}

    return this.http.post(`${this.Url}${this.Port}/post/comment`, payload)
  }



}
