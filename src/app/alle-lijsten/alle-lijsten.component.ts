import { Component, OnInit } from '@angular/core';
import { LijstService } from '../services/lijst.service';
import { Lijst } from '../models/lijst.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alle-lijsten',
  templateUrl: './alle-lijsten.component.html',
  styleUrls: ['./alle-lijsten.component.scss']
})
export class AlleLijstenComponent implements OnInit {
  page = 1;
  pageSize = 8;
  lijsten: Lijst[];

  constructor(private _lijstService: LijstService, private router: Router) {
    //alle lijsten ophalen 
    this._lijstService.getLijst().subscribe(
      result => {
        this.lijsten = result;
      }
    );
  }

  //de lijst bekijken in detail op een andere pagina
  bekijkLijst(lijstID) {
    sessionStorage.setItem("lijstID", lijstID);
    this.router.navigate(['lijstDetail'], {replaceUrl: true})
  }

  ngOnInit(): void {
  }

}
