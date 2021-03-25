import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../models/item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  URL_ITEMS = 'http://localhost:8080/items';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private httpClient: HttpClient
  ) {}

  listAll(): Observable<Item[]> {
    return this.httpClient.get<Item[]>(this.URL_ITEMS);
  }

  findById(id: number): Observable<Item> {
    return this.httpClient.get<Item>(`${this.URL_ITEMS}/${id}`);
  }

  add(obj: Item): Observable<Item> {
    return this.httpClient.post<Item>(this.URL_ITEMS, obj, this.httpOptions);
  }

  update(obj: Item): Observable<Item> {
    return this.httpClient.put<Item>(`${this.URL_ITEMS}/${obj.id}`, obj, this.httpOptions);
  }

  remove(id: number): Observable<object> {
    return this.httpClient.delete<Item>(`${this.URL_ITEMS}/${id}`);
  }
}
