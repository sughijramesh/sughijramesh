import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ToastController,Events} from 'ionic-angular';
import { Product } from '../../models/product';
import { ProductService } from '../../providers/product-service';

import { Observable } from 'rxjs/Rx';
import { CartService } from '../../providers/cart-service';
import { CartItem } from '../../models/cart-item';
import { HomePage } from '../home/home';
import { CartPage } from '../cart/cart';
import { Cart } from '../../models/cart';

@IonicPage()
@Component({
  selector: 'page-starter',
  templateUrl: 'starters.html',
})
export class StarterPage {



  countCartItems:number;
  arr: number[]= new Array(100);
  qty: number=0;
  products: Observable<Product[]>;
  productsInPromotion: Observable<Product[]>;
  Starter_prod: Observable<Product[]>;
  cart:Cart;
  starter_prod:any;



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
    this.cartService.getCountCartItems().then((data) => {
      this.countCartItems = data;
    });
   
   

  }



  onreload(){
    this.starter_prod = this.productService.getstarters();
    this.cartService.getContent().then((data: CartItem[]) => {

      this.cart.cartItems=data;
      if (data === null) {
        this.cart.cartItems = [];
        data = [];
      }
      if(this.cart.cartItems.length!==0  ){
       // console.log("case1")
            for(var i=0;i<this.cart.cartItems.length;i++){

              for(var j=0;j<this.starter_prod.source.value.length;j++){
                  if(this.cart.cartItems[i]){
                   // console.log("case2")

           if(this.cart.cartItems[i].product.id== this.starter_prod.source.value[j].id){
             this.arr[this.starter_prod.source.value[j].index]=this.cart.cartItems[i].qty;
             i=i+1;


           }else{
            // console.log("case3")

             this.arr[this.starter_prod.source.value[j].index]=0;
           }
         }
         }

         }
      }else{
        //console.log("case4")

        for(var j1=0;j1<this.starter_prod.source.value.length;j1++){
          this.arr[this.starter_prod.source.value[j1].index]=0;

        }
      }




     this.getstarters();

   });

  }

  
  getstarters() {
    this.Starter_prod = this.productService.getstarters();
  }

  
  incrementQty(item :Product) {
    this.cartService.getCountCartItems().then((data) => {
      this.countCartItems = data;
    });
    if(this.arr[item.index]<20){
      this.arr[item.index]++
      this.qty=this.arr[item.index];
    }else{
      this.arr[item.index]=20;
      this.qty=this.arr[item.index];
    }
    this.addToCart(item)

    

  }

  decreaseQty(item ) {
   
    if(this.arr[item.index]>0){
      this.arr[item.index]--;
      this.qty=this.arr[item.index];
      this.addToCart(item);
     }else{
      this.arr[item.index]=0;
      this.qty=this.arr[item.index];
     
    }
    

    this.cartService.getCountCartItems().then((data) => {
      this.countCartItems = data;
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

    console.log(this.cart.cartItems,"immune")

  }
  viewcart(){
    this.navCtrl.push(CartPage)
  }
  back(){
    
   
    this.navCtrl.setRoot(HomePage);
  
  
  
}

}
