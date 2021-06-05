import { Component } from '@angular/core';
import { IonicPage, Events, Nav } from 'ionic-angular';

import { StarterPage } from '../starters/starters';
import { CartPage } from '../cart/cart';
import { HomePage } from '../home/home';
import { CartService } from '../../providers/cart-service';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = StarterPage;
  tab3Root = CartPage;
  countCartItems: number;

  constructor(
    public events: Events,
    public cartService: CartService,
    public nav: Nav,
  ) {
    this.events.subscribe('cart:added', (countItems) => {
      this.countCartItems = countItems;
    });
    //this.gocart()
  }

  ionViewDidLoad() { 

    this.cartService.getCountCartItems().then((data) => {
      this.countCartItems = data;
    });

  }
  gocart(){
    this.nav.push(CartPage);

  }

}
