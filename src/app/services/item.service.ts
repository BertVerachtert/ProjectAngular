import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from '../models/item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient) { }

  addItem(item: Item){
    return this.http.post<Item>("https://localhost:44308/api/item", item)
  }

  deleteItem(itemID: number) {
    return this.http.delete<Item>("https://localhost:44308/api/item/" + itemID)
  }
}
