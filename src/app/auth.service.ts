import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {

  constructor(private http: Http) { }


  isLoggedIn() {
    if (localStorage.getItem('login')) {
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
        if (res.json().message === 'ok') {
          this.saveSession();
          return true;
        } else {
          return res.json().message;
        }
      });
  }
  saveSession() {
    localStorage.setItem('login', 'true');
  }

  logout() {
    localStorage.removeItem('login');
  }

  register(user) {
    return this.http.post('http://localhost:3000/auth/register', user)
      .map((res) => {
        if (res.status === 200) { return true; } else { return res.json().message; }
      });
  }
}
