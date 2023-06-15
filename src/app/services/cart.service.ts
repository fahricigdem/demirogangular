import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { CartItems } from '../models/cartItems';
import { CartItem } from '../models/cartItem';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor() {}

  addToCart(product: Product) {
    let item = CartItems.find((c) => c.product.productId === product.productId);
    if (item) item.quantity += 1;
    else {
      let newCartItem = new CartItem();
      newCartItem.product = product;
      newCartItem.quantity = 1;
      CartItems.push(newCartItem);
    }
  }

  list(): CartItem[] {
    return CartItems;
  }

  deleteFromCart(cartItem: CartItem) {
    let item: CartItem | undefined = CartItems.find(
      (i) => i.product.productId === cartItem.product.productId
    );
    if (item) CartItems.splice(CartItems.indexOf(item), 1);
  }
}
