import { CartItem } from './cart-item';

export class Cart {
  cartItems: CartItem[] = [];

  public total() {
    return this.cartItems
      .map((item) => item.subtotal())
      .reduce((previous, current) => previous + current, 0);;
  }

}
