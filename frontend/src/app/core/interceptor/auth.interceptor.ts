import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AuthService } from '../services/authService/auth.service';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private service : AuthService, private route : Router){}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = localStorage.getItem('token');
    

    if(token){
      const decodeToken = jwtDecode(token)
      const tokenSession : any = decodeToken.exp
      const now = Math.floor(Date.now()/1000)
      if(tokenSession < now){
        localStorage.clear()
        this.route.navigate([''])
        return next.handle(req)
      }
    
      const cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
      return next.handle(cloned);
    }

    return next.handle(req);
  }
}
