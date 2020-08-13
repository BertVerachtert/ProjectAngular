import { Component, OnInit } from '@angular/core';
import { Gebruiker } from '../models/gebruiker.model';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthenticateService } from '../security/services/authenticate.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginStatus: boolean = false;
  submitted : boolean = false;
  
  loginForm = this.fb.group({
    email: new FormControl('', Validators.required),
    wachtwoord: new FormControl('', Validators.required)
    });

  constructor(private fb: FormBuilder, private _authenticateService : AuthenticateService, private router : Router) {

   }
  ngOnInit() {
  }

  //de gebruiker inloggen
  onSubmit() {
    this._authenticateService.authenticate(this.loginForm.value).subscribe(result => {
    this._authenticateService.isLoggedin.next(result.token ? true : false);
    localStorage.setItem("token",result.token);
    sessionStorage.setItem("gebruikerID", String(result.gebruikerID));
    this.loginStatus = false;
    this.router.navigate(['dashboard'], {replaceUrl: true});
    },
    HttpErrorResponse => {
      this.loginStatus = true;
      console.log('error');
    });
  }

}
