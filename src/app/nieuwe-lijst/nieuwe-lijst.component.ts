import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray,  FormControl} from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Lijst } from '../models/lijst.model';
import { LijstService } from '../services/lijst.service';
import { Router } from '@angular/router';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { finalize } from 'rxjs/operators';
import { Item } from '../models/item.model';


@Component({
  selector: 'app-nieuwe-lijst',
  templateUrl: './nieuwe-lijst.component.html',
  styleUrls: ['./nieuwe-lijst.component.scss']
})
export class NieuweLijstComponent implements OnInit {
  createLijstForm: FormGroup;
  lijstItems: FormArray;
  datumKloptNiet: boolean = false;
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  imageURLs : any[] = [];
  tempItems : Item[];

  get itemFormGroup(){
    return this.createLijstForm.get('items') as FormArray;
  }

  constructor(private fb: FormBuilder, private _lijstService: LijstService, private router : Router, private afStorage: AngularFireStorage) { }

  gebruikerID: number = Number(sessionStorage.getItem('gebruikerID'));
  nieuweLijst: Lijst = new Lijst(0, '', '', new Date(), new Date(), 0 ,null); 

  ngOnInit(): void {
    this.createLijstForm = this.fb.group({
      titel: new FormControl('', Validators.required),
      beschrijving: new FormControl('', Validators.required),
      startDatum : new FormControl('', Validators.required),
      eindDatum : new FormControl('', Validators.required),
      items: this.fb.array([this.createLijstItem()])
    });

    this.lijstItems = this.createLijstForm.get('items') as FormArray;
  }

  //een nieuwe optie aan de lijst toevoegen
  nieuwOptie() {
    this.lijstItems.push(this.createLijstItem());
  }

  //een optie verwijderen uit de lijst
  verwijderOptie(index) {
    this.lijstItems.removeAt(index);
  }

  //als er een foto wordt geupload deze in firebase opslaan en de url terug krijgen
  upload(event, itemID) {
    const id = Math.random().toString(36).substring(2);
    this.ref = this.afStorage.ref(id);
    this.task = this.ref.put(event.target.files[0]);
    this.task.snapshotChanges().pipe(
      finalize(() => {
        this.ref.getDownloadURL().subscribe(url => {
          this.imageURLs.push({
            imageurl : url,
            itemid : itemID
          });
        })
      })
    ).subscribe();
  }

  createLijstItem(): FormGroup {
    return this.fb.group({
      antwoord: [''],
      beschrijvingAntwoord: [''],
      foto: ['']
    })
  }

  //de lijst maken zolang de datums kloppen
  onSubmit(){
    if (this.createLijstForm.get(['startDatum']).value <this.createLijstForm.get(['eindDatum']).value){
      this.datumKloptNiet = false;
      this.nieuweLijst.naam = this.createLijstForm.get(['titel']).value;
      this.nieuweLijst.beschrijving = this.createLijstForm.get(['beschrijving']).value;
      this.nieuweLijst.startDatum = this.createLijstForm.get(['startDatum']).value;
      this.nieuweLijst.eindDatum = this.createLijstForm.get(['eindDatum']).value;
      this.nieuweLijst.gebruikerID = this.gebruikerID;
      this.tempItems = this.createLijstForm.value.items;
      for (let temp of this.imageURLs) {
        if (this.tempItems[temp.itemid] != null) {
          this.tempItems[temp.itemid].foto = temp.imageurl;
        }
      }
      this.nieuweLijst.items = this.tempItems;
      this._lijstService.addLijst(this.nieuweLijst).subscribe(result => {
        this.router.navigate(['dashboard'], {replaceUrl: true});
      })
    }
    else {
      this.datumKloptNiet = true;
    }
  }

}
