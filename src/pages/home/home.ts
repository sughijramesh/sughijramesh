import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartPage } from '../cart/cart';
import { CartService } from '../../providers/cart-service';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  countCartItems:number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public cartService: CartService,) {
  }

  ionViewDidLoad() {
    console.log('HomePage');
    this.cartService.getCountCartItems().then((data1) => {
      this.countCartItems = data1;
    });
  }
  viewcart(){
    this.navCtrl.push(CartPage)
  }

}
