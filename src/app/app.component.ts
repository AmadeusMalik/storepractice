import { Component, Inject, OnInit } from '@angular/core';
import { CommonService } from './common.service';
import { Products, Image } from './products';
import { Cart } from './cart';
import { FormGroup } from '@angular/forms';
interface CartItem {
  id: number;
  name: string;
  price: number;
  qnt: number;
  total: number;
  category: string,
  image: Image
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  total: number = 0;
  itemTotal: number = 0;
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
    const existingItem = this.cart.find((item) => item.id === product.id);
    if (existingItem) {
      // Handle existing item
      existingItem.qnt++;
      existingItem.total = this.singleItemCost(existingItem); // Update total for existing item
      this.calculate(); // Update overall cart total
    } else if (product.qnt < 10) {
      const cartItem: CartItem = {
        ...product,
        qnt: 1,
        total: product.price // Initial total for new item
      };
      this.cart.push(cartItem);
      this.calculate();
    } else {
      return console.log('no more in stock');
    }
  }

  singleItemCost(item: CartItem): number {
    return item.price * item.qnt;
  }
  removeItem(index: number) {
    this.cart.splice(index, 1); // Removes one element starting at index
    this.calculate(); // Recalculate total after removal
  }
  /*** CALCULATE CART TOTAL ***/
  calculate() {
    this.total = this.cart.reduce(
      (acc, product) => acc + product.price * product.qnt,
      0
    );
  }
}
