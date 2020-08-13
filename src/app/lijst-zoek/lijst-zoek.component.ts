import { Component, OnInit } from '@angular/core';
import { LijstService } from '../services/lijst.service';
import { Lijst } from '../models/lijst.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lijst-zoek',
  templateUrl: './lijst-zoek.component.html',
  styleUrls: ['./lijst-zoek.component.scss']
})
export class LijstZoekComponent implements OnInit {
  zoekString: string = "";
  page = 1;
  pageSize = 8;
  lijsten: Lijst[];
  zoekResultaten: Lijst[] = [];

  constructor(private _lijstService: LijstService, private router: Router) { 
    this.zoekString = sessionStorage.getItem('zoekString');
  }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
    this.laadLijsten();
  }

  //lijsten ophalen
  laadLijsten(){  
    this._lijstService.getLijst().subscribe(
      result => {
        this.lijsten = result;
        this.checkLijsten();
      }
    ); 
  }

  //kijken welke lijsten de zoekstring bevatten
  checkLijsten(){
    this.lijsten.forEach(item => {
      if(item.naam.toLowerCase().includes(this.zoekString.toLowerCase())){
        this.zoekResultaten.push(item);
      }
    })
  }

  //de lijst in detail bekijken op een andere pagina
  bekijkLijst(lijstID) {
    sessionStorage.setItem("lijstID", lijstID);
    this.router.navigate(['lijstDetail'], {replaceUrl: true})
  }

}
