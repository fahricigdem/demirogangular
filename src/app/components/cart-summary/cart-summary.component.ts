import { Component } from '@angular/core';
import { CartItem } from 'src/app/models/cartItem';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.css'],
})
export class CartSummaryComponent {
  isDropdownShown: boolean = false;
  cartItems: CartItem[];

  constructor(
    private cartService: CartService,
    private toastr: ToastrService
  ) {}
  ngOnInit() {
    this.getCart();
  }

  getCart() {
    this.cartItems = this.cartService.list();
  }

  deleteItemFromCart(cartItem: CartItem) {
    this.cartService.deleteFromCart(cartItem);
    this.toastr.error(cartItem.product.productName + 'sepetten silindi!');
  }
}
