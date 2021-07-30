import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';
import {User} from './User';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = 'http://localhost:5000/users'

  constructor(private httpClient: HttpClient) { } 

  getUsers(): Observable<User[]>{
    return this.httpClient.get<User[]>(this.apiUrl);
  }


}
