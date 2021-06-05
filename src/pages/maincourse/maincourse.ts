import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController,Events } from 'ionic-angular';
import { Product } from '../../models/product';
import { ProductService } from '../../providers/product-service';

import { Observable } from 'rxjs/Rx';
import { CartService } from '../../providers/cart-service';
import { CartPage } from '../cart/cart';
import { Cart } from '../../models/cart';
import { CartItem } from '../../models/cart-item';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-maincourse',
  templateUrl: 'maincourse.html',
})
export class MainCoursePage {


  Main_Course: Observable<Product[]>;
  countCartItems:number=0;
  arr: number[] = new Array(100);
  qty: number = 0;
  products: Observable<Product[]>;
  productsInPromotion: Observable<Product[]>;
  Starter_prod: Observable<Product[]>;
  cart: Cart;
  main_Course: any;



  constructor(
    public events: Events,

    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public productService: ProductService,
    public cartService: CartService,
    public navParams: NavParams

  ) {
    this.cart = new Cart();
    this.events.subscribe('cart:added', (countItems) => {
      this.countCartItems = countItems;
    });

  }

  ionViewDidLoad() {

    this.onreload();

    this.cartService.getCountCartItems().then((data1) => {
      this.countCartItems = data1;
    });
    

  }



  onreload() {
    this.main_Course = this.productService.getmaincourse();

    this.cartService.getContent().then((data: CartItem[]) => {
    this.cart.cartItems=data;
    if (data === null) {
      this.cart.cartItems = [];
      data = [];
    }
      //debugger;
      if (this.cart.cartItems.length!==0) {
        for (var i = 0; i < this.cart.cartItems.length; i++) {

        for (var j = 0; j < this.main_Course.source.value.length; j++) {

          if(this.cart.cartItems[i]){
            if (this.cart.cartItems[i].product.id == this.main_Course.source.value[j].id) {
              this.arr[this.main_Course.source.value[j].index] = this.cart.cartItems[i].qty;
              i = i + 1;


            } else {

              this.arr[this.main_Course.source.value[j].index] = 0;
            }
          }else{
            this.arr[this.main_Course.source.value[j].index] = 0;

          }
        }

        }
      } else {
        console.log("ksjfhjsfhkj", "sjjjjjj")
        for (var j1 = 0; j1 < this.main_Course.source.value.length; j1++) {
          this.arr[this.main_Course.source.value[j1].index] = 0;

        }

      }

      this.getmaincourse();
 
    });

  }

  

  getmaincourse() {
    this.Main_Course = this.productService.getmaincourse();
  }

 
  incrementQty(item: Product) {
    this.cartService.getCountCartItems().then((data1) => {
      this.countCartItems = data1;
    });
    if (this.arr[item.index] < 20) {
      this.arr[item.index]++
      this.qty = this.arr[item.index];


    } else {
      this.arr[item.index] = 20;
      this.qty = this.arr[item.index];


    }
    this.addToCart(item)
    



  }

  decreaseQty(item) {
    if (this.arr[item.index] > 0) {
      this.arr[item.index]--;
      this.qty = this.arr[item.index];
      this.addToCart(item)
    } else {
      this.arr[item.index] = 0;
      this.qty = this.arr[item.index];
    }
    this.cartService.getCountCartItems().then((data1) => {
      this.countCartItems = data1;
    });


  }


  addToCart(item: Product) {
    this.cartService.addCartItem(item, this.qty).then(() => {
      const toast = this.toastCtrl.create({
        message: 'This item has been added to cart',
        duration: 2000,
        position: 'bottom',
        cssClass: 'customToastClass',
        //dismissOnPageChange: true,
      });
      toast.present();
    });
  }
  viewcart() {
    this.navCtrl.push(CartPage)
  }
  back(){
    
   
      this.navCtrl.setRoot(HomePage);
    
    
    
  }

}
