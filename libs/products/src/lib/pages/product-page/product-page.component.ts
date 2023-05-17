import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'products-product-page',
  templateUrl: './product-page.component.html',
  styles: [
  ]
})
export class ProductPageComponent implements OnInit, OnDestroy{

  product: Product;
  endSubs$ : Subject<any> = new Subject();
  quantity: number;

  constructor(private productsService: ProductsService, private route: ActivatedRoute){}

  ngOnInit(): void {
      this.route.params.subscribe(params => {
        if(params.productid){
          this._getProduct(params.productid);
        }
      })
  }

  ngOnDestroy(): void {
      this.endSubs$.complete();
  }

  private _getProduct(id: string){
    this.productsService.getProduct(id).pipe(takeUntil(this.endSubs$)).subscribe(resProduct => {
      this.product = resProduct;
    })
  }

  addProductToCart(){
    return
  }
}
