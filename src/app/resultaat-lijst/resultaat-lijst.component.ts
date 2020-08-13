import { Component, OnInit } from '@angular/core';
import { Lijst } from '../models/lijst.model';
import { LijstService } from '../services/lijst.service';

@Component({
  selector: 'app-resultaat-lijst',
  templateUrl: './resultaat-lijst.component.html',
  styleUrls: ['./resultaat-lijst.component.scss']
})
export class ResultaatLijstComponent implements OnInit {

  lijstID : number;
  lijst : Lijst;

  constructor(private _lijstService: LijstService) { 
    this.lijstID = Number(sessionStorage.getItem('resultID'))
  }

  ngOnInit(): void {
    this.laadLijst();
  }

  //de lijst ophalen
  laadLijst(){
    this._lijstService.getLijstDetail(this.lijstID).subscribe(result => {
      this.lijst = result;
    });
  }

}
