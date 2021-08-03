import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable, of } from 'rxjs';
import {User} from './User';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private apiUrl = 'http://localhost:5000/users'

  users : Observable<User[]> = new Observable;
  usersArray : User[] = [];

  constructor(private httpClient: HttpClient) { } 

  getUsers(): Observable<User[]>{
    this.users = this.httpClient.get<User[]>(this.apiUrl)
    return this.users;
  }

  getUserByUsername(username:string) : Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.apiUrl}/?username=${username}`);
  }

  letUserIn(username:string, password:string): Observable<boolean>{
    let subject = new Subject<boolean>();
    this.httpClient.get<User[]>(`${this.apiUrl}/?username=${username}`).subscribe(
      users => {
        if(users[0].password == password)
          subject.next(true);
          else subject.next(false); 
      }
    );
    return subject.asObservable();
  }

  userExists(username:string) : Observable<boolean>{
    let subject = new Subject<boolean>();
    this.httpClient.get<User[]>(`${this.apiUrl}/?username=${username}`).subscribe(
      users => {
        subject.next( !(typeof users[0] == 'undefined')); 
      }
    );
    return subject.asObservable();
  }

  emailExists(email:string) : Observable<boolean>{
    let subject = new Subject<boolean>();
    this.httpClient.get<User[]>(`${this.apiUrl}/?email=${email}`).subscribe(
      users => {
        subject.next( !(typeof users[0] == 'undefined')); 
      }
    );
    return subject.asObservable();
  }

  
  getNextId(): Observable<number>{
    let subject = new Subject<number>();
    this.httpClient.get<User[]>(`${this.apiUrl}`).subscribe(
      users => {
        subject.next(users.length+1);
      }
    );
    return subject.asObservable();
  }

  addUser(user: User) : Observable<User>{
    return this.httpClient.post<User>(this.apiUrl, user, this.httpOptions);
  }

}
