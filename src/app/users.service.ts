import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable, of } from 'rxjs';
import {User} from './User';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = 'http://localhost:5000/users'

  users : Observable<User[]> = new Observable;
  usersArray : User[] = [];

  constructor(private httpClient: HttpClient) { } 

  getUsers(): Observable<User[]>{
    this.users = this.httpClient.get<User[]>(this.apiUrl)
    return this.users;
  }

  getUserID(username:string) : Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.apiUrl}/?username=${username}`);
  }

}
