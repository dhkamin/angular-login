import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {

  constructor(private http: Http) { }


  isLoggedIn() {
    if (localStorage.getItem("token")) {
      console.log('return true');
      return true;
    } else {
      console.log('return false');
      return false;
    }
  }

  login(user) {
    return this.http.post('http://localhost:3000/auth/login', user)
      .map((res) => {
        if (res.json().message === "ok" ) {
         const token = res.json().token ;
          this.saveSession(token);
          return true;
        } else {  
          return res.json().message;
        }
      });
  }
  saveSession(token) {
    localStorage.setItem("token" ,  token);
  }

  logout() {
    localStorage.removeItem('token');
  }

  register(user) {
    return this.http.post('http://localhost:3000/auth/register', user)
      .map((res) => {
        const token = res.json().token ;
        if (res.status === 200) { this.saveSession(token); return true; } else { return res.json().message; }
      });
  }
}
