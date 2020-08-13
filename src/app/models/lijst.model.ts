import { Item } from './item.model';
import { LijstGebruiker } from './lijst-gebruiker.model';

export class Lijst {
    constructor(
        public lijstID: number,
        public naam: string,
        public beschrijving: string,
        public startDatum: Date,
        public eindDatum: Date,
        public gebruikerID: number,
        public items: Item[],
    ){ }
}
