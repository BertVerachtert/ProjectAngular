import { Lijst } from './lijst.model';
import { Stem } from './stem.model';

export class Item {
    constructor(
        public itemID:number ,
        public lijstID:number ,
        public antwoord:string ,
        public beschrijvingAntwoord:string,
        public foto:string,
        public lijst:Lijst,
        public stems:Stem[]
        ){}
}
