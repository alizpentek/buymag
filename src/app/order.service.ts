import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Order} from './Order'
import { Observable, of } from 'rxjs';
import { User } from './User';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  constructor(private httpClient: HttpClient) { }

  private apiUrl = 'http://localhost:5000/Order';

  getOrder(user: User): Observable<Order[]>{
    return this.httpClient.get<Order[]>(`${this.apiUrl}/?idUser=${user.id}`);
  }

  addOrder(order: Order) : Observable<Order>{
    return this.httpClient.post<Order>(this.apiUrl, order, this.httpOptions);
  }

  deleteOrder(id:number) : Observable<Order>
  {
    const url = `${this.apiUrl}/?id=${id}`;
    alert('want to delete');
    return this.httpClient.delete<Order>(url, this.httpOptions);
  }
} 
