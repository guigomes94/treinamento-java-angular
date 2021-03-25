import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemDTO } from '../models/itemDTO.model';
import { Order } from '../models/order.model';
import { OrderReq } from '../models/orderReq.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  URL_ORDERS = 'http://localhost:8080/orders';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private httpClient: HttpClient
  ) {}

  listAll(): Observable<Order[]> {
    return this.httpClient.get<Order[]>(this.URL_ORDERS);
  }

  findById(id: number): Observable<Order> {
    return this.httpClient.get<Order>(`${this.URL_ORDERS}/${id}`);
  }

  add(obj: Order): Observable<Order> {
    return this.httpClient.post<Order>(this.URL_ORDERS, obj, this.httpOptions);
  }

  addItems(obj: ItemDTO): Observable<Order> {
    return this.httpClient.post<Order>(`${this.URL_ORDERS}/${obj.orderId}/items`, obj, this.httpOptions);
  }

  update(obj: Order): Observable<Order> {
    return this.httpClient.put<Order>(`${this.URL_ORDERS}/${obj.id}`, obj, this.httpOptions);
  }

  updateStatus(obj: OrderReq): Observable<Order> {
    return this.httpClient.put<Order>(`${this.URL_ORDERS}/${obj.id}`, obj, this.httpOptions);
  }

  remove(id: number): Observable<object> {
    return this.httpClient.delete<Order>(`${this.URL_ORDERS}/${id}`);
  }
}
