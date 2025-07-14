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

}
