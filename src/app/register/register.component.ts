import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {

    this.registerForm = fb.group(
      {
        'email': ['', [Validators.email, Validators.required]],
        'password': ['', Validators.minLength(8)],
        'Confirm': ['', Validators.minLength(8)]
      }
    );
  }



  ngOnInit() {
  }

  onClickRegister(register) {

  }
}
