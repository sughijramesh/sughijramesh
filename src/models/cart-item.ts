import { Product } from './product';

export class CartItem {
  product: Product;
  productId: string | number;
  price: number;
  qty: number = 0;

  subtotal() {
    return this.price * this.qty;
  }


  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }

}
