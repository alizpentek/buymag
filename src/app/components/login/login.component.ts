import { Component, OnInit } from '@angular/core';
import {faUser} from '@fortawesome/free-solid-svg-icons'
import { User } from 'src/app/User';
import { UsersService } from 'src/app/users.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username : string = '';
  password : string = '';

  users: User[] = [];
  faUser = faUser;

  constructor(private usersService:UsersService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void{
    this.usersService.getUsers().subscribe(users => this.users = users);
  }
  
  valid() : boolean {
    var un = document.querySelector('.error') as HTMLSpanElement;
    if(this.username =='') {
      un.innerHTML = 'Please give us your username';
      return false;
    }
    if(this.password ==''){
      un.innerHTML = 'Please insert your password';
      return false;
    }
    un.innerHTML = '';
    return true;
  }



  onSubmit(){
    if(this.valid()){
      this.usersService.getUserID('admin').subscribe(user => alert(user[0].username));
    }
  }

}
