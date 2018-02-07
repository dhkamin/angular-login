import { Injectable } from '@angular/core';

import { AuthHttp, AuthConfig,JwtHelper } from 'angular2-jwt';
import { Http } from '@angular/http';


@Injectable()
export class ListtodoService {

  jwtHelper: JwtHelper = new JwtHelper();

  constructor(private http: Http) { }

  useJwtHelper() {
    var token = localStorage.getItem('token');
   
    console.log(
      this.jwtHelper.decodeToken(token),
      
    );
    return  this.jwtHelper.decodeToken(token).id;
  }
  
  addTodo(todo){
    return this.http.post('http://localhost:3000/task/addTask', todo)
    .map((res) => {
      
      if (res.status === 200) { 
         return true; } 
      else 
      { return res.json().message; }
    });
  
  }
  
}
