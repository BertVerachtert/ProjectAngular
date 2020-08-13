import { Stem } from './stem.model';
import { LijstGebruiker } from './lijst-gebruiker.model';

export class Gebruiker {
    constructor(
        public gebruikerID:number,
        public email:string,
        public wachtwoord:string,
        public gebruikersnaam:string,
        public activatie:boolean,
        public stems:Stem[],
        public lijstGebruikers:LijstGebruiker[],
        public token:string
    ){}
}
