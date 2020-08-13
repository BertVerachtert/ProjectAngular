import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from '../security/services/authenticate.service';
import { GebruikerService } from '../services/gebruiker.service';
import { Gebruiker } from '../models/gebruiker.model';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  loggedin : boolean;
  geb : string;
  curGebruiker : Gebruiker;
  zoekForm : FormGroup;

  constructor(private _authenticateService : AuthenticateService, private _gebruikerServer : GebruikerService, private router : Router, private fb: FormBuilder) { 
    this._authenticateService.isLoggedin.subscribe(e=> {
      if(this._authenticateService.isLoggedin.value == true){
        this.loggedin = true;
      } else{
        this.loggedin = false;
      }
      if(sessionStorage.getItem('gebruikerID') != null){
        this.loggedin = true;
      }
    })
  }

  ngOnInit() {
    this.zoekForm = this.fb.group({
      zoekString: new FormControl('', Validators.required)
    })
  }

  //de gebruiker uitloggen
  logoff(){
    localStorage.clear();
    sessionStorage.clear();
    this._authenticateService.isLoggedin.next(false);
    this.router.navigate([''], {replaceUrl: true});
  }

  //de lijst zoeken met bepaalde letters of cijfers en doorsturen naar een andere pagina
  zoekLijst(){
    sessionStorage.setItem('zoekString', this.zoekForm.get(['zoekString']).value);
    this.router.navigate(['lijstZoek'], {replaceUrl: true});
  }

}