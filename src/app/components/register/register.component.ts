import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/users.service';
import { User } from 'src/app/User';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  err1:string ='';
  err2:string ='';
  err3:string ='';
  err4:string ='';
  username: string = '';
  pass1: string='';
  pass2: string='';
  email: string ='';

  constructor(private usersService:UsersService, 
    private router:Router) { }

  ngOnInit(): void {
  }

  changeUsername(): void{
    if(this.username.length<4){
      this.err1 = 'Must contain at least 4 characters';
      return;
    }
    this.usersService.userExists(this.username).subscribe((r)=>{
      if(r){
        this.err1 = 'User already exists';
      }
      else this.err1 = '';
    });
  }

  changeEmail(): void{
    this.usersService.emailExists(this.email).subscribe((r)=>{
      if(r){
        this.err2 = 'Email already exists';
      }
      else this.err2 = '';
    })
  }

  changePass1(): void{
    if(this.pass1.length<8)
      this.err3="Password must contain at least 8 charachters";
      else this.err3 = '';
  }

  changePass2(): void{
    if(this.pass1 !== this.pass2)
      this.err4="Passwords must collide";
      else this.err4='';
  }

  onSubmit(): void{
    if(this.err1==='' && this.err2==='' && this.err3==='' && this.err4==='')
    {
      if(this.username!='' && this.pass1!='' && this.pass2!='' && this.email!='')
      {
        if(document.querySelector('#accept:checked') !== null){

          this.usersService.getNextId().subscribe((r) => {
            let newUser: User = {
              id : r,
              username: this.username,
              email: this.email,
              privilege : 2,
              password: this.pass1
            };

            this.usersService.addUser(newUser).subscribe(r=>{
              alert('Registration succesfull');
              this.router.navigate(['/login']);
            })
          })

          }
      }
    }
  }
}
