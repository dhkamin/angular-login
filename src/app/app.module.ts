import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from './material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { LoginGuardGuard } from './login-guard.guard';
import { AuthService } from './auth.service';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { TodolistComponent, TodoComponent } from './todolist/todolist.component';
import { AddtodoComponent, FormtodoComponent } from './addtodo/addtodo.component';
import { AuthHttp, AuthConfig,JwtHelper } from 'angular2-jwt';
import { ListtodoService } from './listtodo.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    TodolistComponent,
    TodoComponent,
    AddtodoComponent,
    FormtodoComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  entryComponents: [ 
    TodoComponent,
    FormtodoComponent
  ],
  providers: [LoginGuardGuard, AuthService,ListtodoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
