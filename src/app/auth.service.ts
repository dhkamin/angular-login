import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  constructor() {

   }

  isLoggedIn() {
   if (localStorage.getItem('login')) {
     console.log('return true');
    return true;
   } else {
    console.log('return false');
     return false;
   }
  }

  login() {
    localStorage.setItem('login', 'true');
    return this.isLoggedIn();
  }
  logout(){
    localStorage.removeItem('login');
  }
}
