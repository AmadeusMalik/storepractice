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
  cart: Cart[] = []
  title = 'Store';
  commonService = Inject(CommonService);
  customLabel = 'My custom label';
  img: any;
  productList: Products[];
  images: Image[] | undefined;
  reactiveForm!: FormGroup;
  constructor(public common: CommonService) {
    this.productList = this.common.getProductList();
    console.log(this.productList);
  }
  ngOnInit() {


  }
addToCart(){

}

}
