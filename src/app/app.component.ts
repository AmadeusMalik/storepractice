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
  changeQnt: boolean = false;
  img: any;
  product: Products[];
  images: Image[] | undefined;
  reactiveForm!: FormGroup;
added: boolean= true;
  totalQuantity : number = 0;
  constructor(public common: CommonService) {
    this.product = this.common.getProductList();
  }
  ngOnInit( ) {}


  addToCart(product: Products) {
    const existingItem = this.cart.find((item) => item.id === product.id);
    if (existingItem) {
      // Handle existing item
      if (existingItem.qnt < 10) {
        product.qnt++
        existingItem.qnt++;
        existingItem.total = this.singleItemCost(existingItem);
        this.calculate();
      } else {
        console.log('Maximum quantity reached');
      }
    } else if (product.qnt < 10) {
      product.qnt++;
      const cartItem: CartItem = {
        ...product,
        qnt: 1,
        total: product.price // Initial total for new item
      };
      this.cart.push(cartItem);
      this.calculate();
    }
  }

  singleItemCost(item: CartItem): number {
    return item.price * item.qnt;
  }
  removeItem(product: Products) {
    const index = this.cart.findIndex(item => item.id === product.id);
    if (index !== -1) {
      const removedItem = this.cart.splice(index, 1)[0];
      // Update the original product's quantity
      product.qnt = 0;
      this.calculate(); // Recalculate totals
      console.log(product.qnt)
    }
  }
  /*** CALCULATE CART TOTAL ***/
  calculate() {
    this.total = this.cart.reduce(
      (acc, product) => acc + product.price * product.qnt,
      0
    );
  }
}
