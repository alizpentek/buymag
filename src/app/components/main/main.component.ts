import { Component, OnInit } from '@angular/core';
import { faBars, faSquare, faCartPlus } from '@fortawesome/free-solid-svg-icons'
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  faBars = faBars;
  faSquare = faSquare;
  faCartPlus =faCartPlus;
  constructor() { }

  ngOnInit(): void {
  }

}
