import { Component, OnInit } from '@angular/core';
import { faBars, faUser } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})
export class MenubarComponent implements OnInit {

  faBars = faBars;
  faUser = faUser;

  user : User = JSON.parse(localStorage.getItem('user') || '{}');
  CurrentDate = new Date();
  constructor( private router: Router) { }


  ngOnInit(): void {
    if( typeof this.user.username == 'undefined'){
      this.router.navigate(['/login']);
    }

  }


  logout(): void{
    localStorage.removeItem('user');
    localStorage.removeItem('stayLoggedIn');
  }

}
