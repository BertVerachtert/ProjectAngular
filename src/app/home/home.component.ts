import { Component, OnInit } from '@angular/core';
import { LijstService } from '../services/lijst.service';
import { Lijst } from '../models/lijst.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  lijsten: Lijst[];
  constructor(private _lijstService: LijstService, private router: Router) { 
  }

  ngOnInit() {
    this._lijstService.getLijst().subscribe(result => {
      this.lijsten = result;

      //random lijsten laten zien die bestaan
      var m = this.lijsten.length, t, i;

      while (m){
        i = Math.floor(Math.random() * m--);

        t = this.lijsten[m];
        this.lijsten[m] = this.lijsten[i];
        this.lijsten[i] = t;
      }
    })
  }

  //de lijst in detail bekijken op een andere pagina
  bekijkLijst(lijstID) {
    sessionStorage.setItem("lijstID", lijstID);
    this.router.navigate(['lijstDetail'], {replaceUrl: true})
  }

}
