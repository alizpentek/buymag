import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Stuff} from './Stuff'
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StuffService {

  constructor( private httpClient: HttpClient) { }

  stuffs: Observable<Stuff[]>= new Observable;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private apiUrl = 'http://localhost:5000/Stuff'

  getStuffs(): Observable<Stuff[]>{
    this.stuffs = this.httpClient.get<Stuff[]>(this.apiUrl);
    return this.stuffs;
  }

  deleteStuff(id: number): Observable<Stuff> {
    const url = `${this.apiUrl}/?order=${id}`;
  
    return this.httpClient.delete<Stuff>(url, this.httpOptions);
  }
}
