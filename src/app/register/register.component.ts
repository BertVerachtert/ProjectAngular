import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthenticateService } from '../security/services/authenticate.service';
import { Router } from '@angular/router';
import { GebruikerService } from '../services/gebruiker.service';
import { Gebruiker } from '../models/gebruiker.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerStatus: boolean = false;
  ingebruikNaam : boolean = false;
  ingebruikEmail : boolean = false;
  submitted : boolean = false;
  newGebruiker : Gebruiker = new Gebruiker(0, '', '', '', false, null, null, null);

  registerForm = this.fb.group({
    gebruikersnaam: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    wachtwoord: new FormControl('', [Validators.required, Validators.minLength(6)]),
    wachtwoordH: new FormControl('', [Validators.required, Validators.minLength(6)])
    });

  constructor(private fb: FormBuilder, private _authenticateService : AuthenticateService, private router : Router, private _gebruikerService : GebruikerService) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this._gebruikerService.checkUsername(this.registerForm.get(['gebruikersnaam']).value).subscribe(
      result => {
        this.ingebruikNaam = result.valueOf();
        //kijken of de gebruikersnaam al bestaat
        if(this.ingebruikNaam == false){
          this._gebruikerService.checkEmail(this.registerForm.get(['email']).value).subscribe(
            result => {
              this.ingebruikEmail = result.valueOf();
              //kijken of de email al in gebruik is
              if(this.ingebruikEmail == false){
                if(this.registerForm.get(['wachtwoord']).value == this.registerForm.get(['wachtwoordH']).value){
                  this.registerStatus = false;
                  this.ingebruikEmail = false;
                  this.ingebruikNaam = false;
                  
                  this.newGebruiker.email = this.registerForm.get(['email']).value;
                  this.newGebruiker.gebruikersnaam = this.registerForm.get(['gebruikersnaam']).value;
                  this.newGebruiker.wachtwoord = this.registerForm.get(['wachtwoord']).value;

                  this._gebruikerService.registreer(this.newGebruiker).subscribe(result => {
                    
                  });
                  this.router.navigate(['login'], {replaceUrl: true});
                } else {
                  this.registerStatus = true;
                }
              } else {
                this.ingebruikEmail = true;
              }
            }
          )
        } else {
          this.ingebruikNaam = true;
        }
      }
    )
  }
}
