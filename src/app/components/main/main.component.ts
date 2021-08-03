import { JsonpClientBackend } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { faBars, faSquare, faCartPlus, faWindowClose } from '@fortawesome/free-solid-svg-icons'
import { User } from 'src/app/User';
import { FoodService } from 'src/app/food.service';
import { Food } from 'src/app/Food';
import { Stuff } from 'src/app/Stuff';
import { StuffService } from 'src/app/stuff.service';
import { Order } from 'src/app/Order';
import { OrderService } from 'src/app/order.service';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  faBars = faBars;
  faSquare = faSquare;
  faCartPlus =faCartPlus;
  faWindowClose = faWindowClose;

  user : User = JSON.parse(localStorage.getItem('user') || '{}');

  foods : Food[] =[];
  stuffs : Stuff[] = [];
  orders : Order[] = [];

  view : string = 'list';
  products: string = 'Food';

  constructor(private foodService: FoodService,
    private stuffService: StuffService,
    private orderService: OrderService) { }

  ngOnInit(): void {
    this.getFoods();
    this.getStuffs();
    this.getOrders();
  }

  getOrders(): void{
    this.orderService.getOrder(this.user).subscribe(orders => this.orders = orders);
  }

  getFoods(): void{
    this.foodService.getFoods().subscribe(foods => {this.foods = this.sort_by_key(foods, "order");});
  }

  getStuffs(): void{
    this.stuffService.getStuffs().subscribe(stuff => this.stuffs = this.sort_by_key(stuff, "order"));
  }


  sort_by_key(array:any[], key:any) : any[]
  {
  return array.sort(function(a, b)
  {
    var x = a[key]; var y = b[key];
    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
  });
  }

  changeView(): void{
    if(this.view==='list'){
      this.view = 'block';
    }
    else{
      this.view = 'list';
    }

    document.querySelectorAll('.afis').forEach( x =>
      x.classList.toggle('activeView')
      )
  }

  changeProduct(p:string): void{
    let prev = this.products;
    this.products = p;
    
    if(prev!=p){
      
       if(document.querySelector('.f')?.classList.contains('act'))
          document.querySelector('.f')?.classList.toggle('act');
        
          if(document.querySelector('.s')?.classList.contains('act'))
          document.querySelector('.s')?.classList.toggle('act');

          if(document.querySelector('.fs')?.classList.contains('act'))
          document.querySelector('.fs')?.classList.toggle('act');


          if(p=='Food'){
            document.querySelector('.f')?.classList.toggle('act');
          }
          else if(p=='Stuff'){
            document.querySelector('.s')?.classList.toggle('act');
          }
          else document.querySelector('.fs')?.classList.toggle('act');
    }
  }


  addtoCart(prod:string, id:number){
    id = this.orders[this.orders.length-1].id+1;
    let order : Order = {
      idUser : this.user.id,
      idProduct : id,
      typeProduct : prod,
      id : id
    }

    this.orderService.addOrder(order).subscribe( r =>
      alert('Product added to the cart'));
      
    window.location.reload();
  
  }

  deleteOrder(id:number){
    
    this.orderService.deleteOrder(id).subscribe(_ => alert('deleted from cart'));
  }
}
