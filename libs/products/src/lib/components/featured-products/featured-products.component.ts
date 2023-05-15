import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'products-featured-products',
  templateUrl: './featured-products.component.html',
  styles: [
  ]
})
export class FeaturedProductsComponent implements OnInit, OnDestroy {
  
  featuredProducts!: Product[]
  endSubs$: Subject<any> = new Subject;
  
  constructor(private productsService: ProductsService){}

  ngOnInit(): void {
      this._getFeaturedProducts();
  }

  ngOnDestroy(): void {
    this.endSubs$.complete();    
  }

  private _getFeaturedProducts(){
    this.productsService.getFeaturedProducts(4).pipe(takeUntil(this.endSubs$)).subscribe(products => {
      this.featuredProducts = products
    })
  }
}
