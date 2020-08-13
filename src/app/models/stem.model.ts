import { Gebruiker } from './gebruiker.model';
import { Item } from './item.model';

export class Stem {
    constructor(
        public stemID:number ,
        public itemID:number ,
        public gebruikerID:number ,
        public item:Item ,
        public gebruiker:Gebruiker ,
    ){ }
}
