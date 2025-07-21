import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  public Url = 'http://localhost:'
  public Port = 3000

  constructor( private http : HttpClient ) { }


  // POST FEATURE (=== CREATE ==== READ ==== UPDATE ==== DELETE)


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

  update(payload : any){
    return this.http.put(`${this.Url}${this.Port}/post/update`, payload)
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



  getPostInfo(userId : any){
    return this.http.get<any>(`${this.Url}${this.Port}/post/getPostInfo/${userId}`)
  }

  unlikePost(postId : any, userId : any){
    const payload = {postId, userId}

    return this.http.delete(`${this.Url}${this.Port}/post/unlike`, { body : payload })
  }

  comment(postId : any, userId : any, text : string){
    const payload = {postId, userId, text}

    return this.http.post(`${this.Url}${this.Port}/post/comment`, payload)
  }

  getAllComments(id : string){
    return this.http.get<any>(`${this.Url}${this.Port}/post/getAllComments/${id}`)
  }

  getAllCommentsCount(){
    return this.http.get(`${this.Url}${this.Port}/post/getAllCommentsCount`)
  }

  deleteComment(commentId : string, postId : string, userId : string){
    const payload = { commentId, postId, userId }
    console.log('payload of comment id, post id, user id', payload)
    return this.http.delete(`${this.Url}${this.Port}/post/deleteComment`, { body : payload })
  }

  editComment(payload : any){
    console.log('payload in edit comment ===============', payload)
    return this.http.put(`${this.Url}${this.Port}/post/editComment`, payload)
  }



}
