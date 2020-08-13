import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray,  FormControl} from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Lijst } from '../models/lijst.model';
import { LijstService } from '../services/lijst.service';
import { Router } from '@angular/router';
import { Item } from '../models/item.model';
import { ItemService } from '../services/item.service';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-edit-lijst',
  templateUrl: './edit-lijst.component.html',
  styleUrls: ['./edit-lijst.component.scss']
})
export class EditLijstComponent implements OnInit {

  lijstID : number;
  lijst : Lijst;
  tempLijst : Lijst;
  begonnen : boolean = false;
  vandaag : Date;
  newItem : Item = new Item(0, 0, '', '', '', null, null);
  tempItemID : number;
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  url: string;

  itemForm = this.fb.group({
    antwoord: new FormControl('', Validators.required),
    beschrijvingAntwoord: new FormControl('', Validators.required),
    foto: ['']
  });

  constructor(private _lijstService: LijstService, private router: Router, private fb: FormBuilder, private _itemService: ItemService, private afStorage: AngularFireStorage) { 
    this.lijstID = Number(sessionStorage.getItem('editID'));
  }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
    this.laadLijst();
  }

  //de lijst ophalen
  laadLijst(){
    this._lijstService.getLijstDetail(this.lijstID).subscribe(result => {
      this.lijst = result;
      this.vandaag = new Date();
      var start : Date = new Date(this.lijst.startDatum);
      //kijken of de lijst al begonnen is
      if(start < this.vandaag){
        this.begonnen = true;
      } else{
        this.begonnen = false;
      }
    });
  }
  
  //een item uit de lijst verwijderen
  deleteItem(itemID) {
    this._itemService.deleteItem(itemID).subscribe(result => {
      this._lijstService.getLijstDetail(this.lijstID).subscribe(result => {
        this.tempLijst = result;
        this.lijst.items = this.tempLijst.items;
      });
    })
  }
  
  //de lijst verwijderen
  deleteLijst(lijstID) {
    this._lijstService.deleteLijst(lijstID).subscribe(result => {
      this.router.navigate(['dashboard'], {replaceUrl: true});
    })
  }

  //als er een foto wordt geupload deze in firebase opslaan en de url terug krijgen
  upload(event) {
    const id = Math.random().toString(36).substring(2);
    this.ref = this.afStorage.ref(id);
    this.task = this.ref.put(event.target.files[0]);
    this.task.snapshotChanges().pipe(
      finalize(() => {
        this.ref.getDownloadURL().subscribe(url => {
          this.url = url;
        })
      })
    ).subscribe();
  }

  //de lijst stoppen
  stopLijst() {
    this.vandaag = new Date();
    this.lijst.eindDatum = this.vandaag;
    this._lijstService.updateLijst(this.lijstID, this.lijst).subscribe(result => {
      this.router.navigate(['dashboard'], {replaceUrl: true});
    })
  }

  //de lijst starten
  startLijst() {
    this.vandaag = new Date();
    this.lijst.startDatum = this.vandaag;
    this._lijstService.updateLijst(this.lijstID, this.lijst).subscribe(result => {
      this.router.navigate(['dashboard'], {replaceUrl: true});
    })
  }

  //als er een nieuw item wordt toegevoegd aan de lijst
  onSubmit(){
    this.newItem.antwoord = this.itemForm.get(['antwoord']).value;
    this.newItem.beschrijvingAntwoord = this.itemForm.get(['beschrijvingAntwoord']).value;
    this.newItem.lijstID = this.lijstID;
    this.newItem.foto = this.url;
    this._itemService.addItem(this.newItem).subscribe(result => {
      this.tempItemID = result.itemID;
      this.newItem.itemID = this.tempItemID;
      this.lijst.items.push(this.newItem);
    })
  }
}
