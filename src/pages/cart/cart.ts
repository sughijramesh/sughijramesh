import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';


import { CartService } from '../../providers/cart-service';

import { CartItem } from '../../models/cart-item';
import { Cart } from '../../models/cart';

import { HomePage } from '../home/home';
import { StarterPage } from '../starters/starters';
import { MainCoursePage } from '../maincourse/maincourse';

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  cart: Cart;
  qty: number = 0;
  local: any;
  total: number = 0;
  isDone: boolean = false;
  alt_value1: any;
  alt_value2: any;
  val:any;




  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public cartService: CartService
  ) {

    this.cart = new Cart();
  
    
  }
 
  ionViewDidLoad() {
   
    this.onLoadCart();
    this.val=this.navCtrl.getPrevious().name;
    console.log(this.val);
    
   }
 

 
  onLoadCart() {


    this.cartService.getContent().then((data: CartItem[]) => {
      this.total = 0
      if(data){

        for (var i = 0; i < data.length; i++) {
          if(data[i].qty==0){
            this.removeItemOfCart(i)

          }
          this.total = this.total + (data[i].price * data[i].qty)

        }

      }

      if (data === null) {
        this.cart.cartItems = [];
        data = [];
      }
      if (this.cart.cartItems.length > 2) {

        console.log(this.cart.cartItems, this.alt_value1)
      }



      this.cart.cartItems = data.map((cartItem: CartItem) => new CartItem().deserialize(cartItem));
    });


   
  }

  incrementQty(item: CartItem) {
    this.qty = item.qty;
    if (this.qty > 19) {
      this.qty == 20;
    } else {
      this.qty++;
    }

    this.cartService.addCartItem(item.product, this.qty).then(() => {

      this.onLoadCart();
    });



  }

  decreaseQty(item: CartItem, index_temp) {

    this.qty = item.qty;
    if (this.qty < 1) {
      this.qty=0;

      if(this.qty==0){
        this.removeItemOfCart(index_temp)

      }



    }
    else{
      this.qty--;
    }


    this.cartService.addCartItem(item.product, this.qty).then(() => {


      this.onLoadCart();
    });

  }

 
  removeItemOfCart(posCartItem) {

    this.cartService.removeFromCart(posCartItem).then(() => {
      this.onLoadCart();
    });
  }

 

  

  
  showmore() {
   
    this.isDone = true;
  } showless() {
   
    this.isDone = false;
  }
  back(){
    
    if(this.val=="StarterPage"){
      this.navCtrl.push(StarterPage);
    }else if(this.val=="MainCoursePage"){
      this.navCtrl.push(MainCoursePage);
    }
    else{
      this.navCtrl.setRoot(HomePage);
    }
   
    
    
  }

}
