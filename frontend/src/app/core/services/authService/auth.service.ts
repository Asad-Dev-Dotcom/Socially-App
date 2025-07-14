import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import * as CryptoJS from 'crypto-js';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public port : number = 3000
  public Url : string = 'http://localhost:'
  private userSubject = new BehaviorSubject<any>(null)
  user$ = this.userSubject.asObservable()
  private logInStatusSubject = new BehaviorSubject<boolean>(false)
  logInStatus$ = this.logInStatusSubject.asObservable()
  token = localStorage.getItem('token')
  EN_SECRET = 'Pakistan-1947-2025'

  constructor(private http : HttpClient) {
    this.loadUser()
  }


decodeToken(token: string): any {
  try {
    const decoded: any = jwtDecode(token);
    const encrypted = decoded.data;
    const bytes = CryptoJS.AES.decrypt(encrypted, this.EN_SECRET);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch (err) {
    console.error('Token decode failed', err);
    return null;
  }
}



  
private loadUser() {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const decodedToken: any = jwtDecode(token);
      const encryptedData = decodedToken.data;

      const bytes = CryptoJS.AES.decrypt(encryptedData, this.EN_SECRET);
      const decryptedJson = bytes.toString(CryptoJS.enc.Utf8);

      if (!decryptedJson) {
        console.warn('Decryption failed or returned empty');
        return;
      }

      const decryptedData = JSON.parse(decryptedJson);

      this.setUser(decryptedData);
    } catch (err) {
      console.error('Error during token decryption:', err);
    }
  }
}

setlogInStatus(status : boolean){
  this.logInStatusSubject.next(status)
}

getlogInStatus() : boolean{
  return this.logInStatusSubject.getValue()
}

  setUser(user : any){
    this.userSubject.next(user)
  }

  getUser(){
    return this.userSubject.getValue()
  }

  signup(form : any) : Observable<any>{
    console.log("====signup:==", form)
    return this.http.post(`${this.Url}${this.port}/user/signup`, form)
  }

  login(form : any) : Observable<any>{
    return this.http.post(`${this.Url}${this.port}/user/login`, form)
  }

}
