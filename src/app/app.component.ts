import { Component, Inject } from '@angular/core';
import { CommonService } from './common.service';
import { Products, Image } from './products';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  commonService = Inject(CommonService);
  productList: Products[];
  images: Image[] | undefined;
  constructor(public common: CommonService) {
    this.productList = this.common.getProductList();
    console.log(this.productList);
  }
  title = 'Store';
}
