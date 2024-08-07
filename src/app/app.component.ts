import { Component, Inject, OnInit } from '@angular/core';
import { CommonService } from './common.service';
import { Products, Image } from './products';
import { Cart } from './cart';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  total: number = 0;
  cart: Cart[] = [];
  title = 'Store';
  commonService = Inject(CommonService);
  customLabel: any;
  img: any;
  product: Products[];
  images: Image[] | undefined;
  reactiveForm!: FormGroup;
  constructor(public common: CommonService) {
    this.product = this.common.getProductList();
  }
  ngOnInit() {}
  chngBtn(product: Products) {
    this.customLabel = product.qnt;
  }
  addToCart(product: Products) {
    if (product.qnt === 0) {
      product.qnt++;
      this.cart.push(product); // Add product to cart
      console.log(product.name, 'has been added to Cart');
      this.calculate(); // Update total after adding
    } else if (product.qnt < 10) {
      product.qnt++;
      this.calculate();
    } else {
      return console.log('no more in stock');
    }
  }
  calculate() {
    this.total = this.cart.reduce(
      (acc, product) => acc + product.price * product.qnt,
      0
    );
  }
}
