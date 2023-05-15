import { Component, Input } from '@angular/core';
import { Product } from '../../models/product';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'products-product-item',
  templateUrl: './product-item.component.html',
  styles: [
  ]
})
export class ProductItemComponent {
  @Input() product!: Product;
}
