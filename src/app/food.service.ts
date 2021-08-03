import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Food} from './Food'
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class FoodService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private apiUrl = 'http://localhost:5000/Food'

  foods : Observable<Food[]> = new Observable;

  constructor(private httpClient: HttpClient) { } 

  getFoods(): Observable<Food[]>{
    this.foods = this.httpClient.get<Food[]>(this.apiUrl)
    return this.foods;
  }

  deleteFood(id: number): any {
    const url = `${this.apiUrl}/?order=${id}`;
    alert('came here');
    return this.httpClient.delete('http://localhost:5000/Food/?order=1',this.httpOptions);
     
  }
}
