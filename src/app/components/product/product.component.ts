import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { CartItems } from 'src/app/models/cartItems';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  dataLoaded: boolean = false;
  filterText: string = '';

  constructor(
    private productService: ProductService,
    private activatedRoot: ActivatedRoute,
    private toastr: ToastrService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    // console.log('on init');
    // params observable'dir. subscribe ile observable'in icine girili.
    this.activatedRoot.params.subscribe((params) => {
      // console.log(params);

      if (params['categoryId']) {
        this.getProductsByCategory(params['categoryId']);
      } else {
        this.getProducts();
      }
    });
  }

  getProducts() {
    //burada asyncron bir fonksiyon calisir, react'daki fetch veya await .... tekniklerine burada gerek yoktur, angular bunu bu sekilde buildin yapar.Bunu bu sekilde uygulamalisin.
    // ayrica subscribe incelendiginde görülür ki:kendisi Substruction dönderir ve subscribe icindeki fonksiyon void dönderir. Dolayisiyla response => response veya {return response} ise yaramiyor.
    this.productService.getProducts().subscribe((response) => {
      // console.log(response);
      this.products = response.data;
      this.dataLoaded = response.success;
    });
  }

  getProductsByCategory(categoryId: number) {
    this.productService
      .getProductsByCategory(categoryId)
      .subscribe((response) => {
        // console.log(response);
        this.products = response.data;
        this.dataLoaded = response.success;
      });
  }

  addToCart(product: Product) {
    console.log(product);
    this.cartService.addToCart(product);
    this.toastr.success(product.productName, 'Ürün Eklendi!');
    console.log(CartItems);
  }
}
