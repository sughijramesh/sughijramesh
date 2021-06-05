import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { Product } from '../models/product';
import { CartItem } from '../models/cart-item';
import { Events } from 'ionic-angular';

const CART_KEY = 'cartItems';

@Injectable()
export class CartService {

  constructor(
    public storage: Storage,
    public events: Events
  ) {
  }

  private eventsCountCartItems(items): void {
    this.events.publish('cart:added', items);
  }

  getContent() {
    return this.storage.get(CART_KEY);
  }

  addCartItem(item: Product, qty: number) {
    return this.getContent().then((result: CartItem[]) => {
      if (result === null) {
        result = [];
      }

      let cartItemFound = result.find((e) => e.productId === item.id);
      if (cartItemFound === undefined || result === []) {
        let cart = new CartItem();
        cart.product = item;
        cart.productId = item.id;
        cart.price = item.price;
        cart.qty = qty;
        result.push(cart);
      } else {
        result.map((val: CartItem) => {
          if (cartItemFound.productId === val.productId) {
            val.qty = qty;
          }
          return val;
        });
      }
      this.eventsCountCartItems(result.length);
      return this.storage.set(CART_KEY, result);
    });
  }

  getCountCartItems() {
    return this.getContent().then(response => {
      return (response) ? response.length : 0;
    });
  }

 

  removeFromCart(posCartItem) {
    return new Promise((resolve) => {
      this.getContent().then((result: CartItem[]) => {
        if (result) {
          console.log(result, posCartItem)
          result.splice(posCartItem, 1);

          this.eventsCountCartItems(result.length);
          this.storage.set(CART_KEY, result).then(() => resolve("success"))
        }
      });
    });
  }



}
