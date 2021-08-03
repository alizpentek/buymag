import { identifierModuleUrl } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import {faUser} from '@fortawesome/free-solid-svg-icons'
import { User } from 'src/app/User';
import { UsersService } from 'src/app/users.service'
import { Router } from '@angular/router';

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

  constructor(private usersService:UsersService, 
    private router:Router) { }

  ngOnInit(): void {
    this.getUsers();
    if(localStorage.getItem('user') && localStorage.getItem('stayLoggedIn')==='true'){
      this.router.navigate(['/products']);
    }
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

  loginOk(user: User){
    let userS = JSON.stringify(user);
    localStorage.setItem('user', userS);
    if(document.querySelector('#accept:checked') !== null){
      localStorage.setItem('stayLoggedIn', 'true');
    }
    else {localStorage.setItem('stayLoggedIn', 'false');
  }
    this.router.navigate(['/products']);
  }

  loginNotOk(){
    
    var un = document.querySelector('.error') as HTMLSpanElement;
    un.innerHTML = 'The password is incorrect';
  }


  onSubmit(){
    if(this.valid()){
      this.usersService.getUserByUsername(this.username).subscribe(user => {
        if(typeof user[0].username == undefined)
        {
          var un = document.querySelector('.error') as HTMLSpanElement;
          un.innerHTML = 'The username is invalid';
        }
        else {
          this.usersService.letUserIn(this.username, this.password).subscribe( (r) => {
            if(r === true){
              this.loginOk(user[0]);
            }
            else this.loginNotOk();
          }
          );
        }
      });
      
    }
  }

}
