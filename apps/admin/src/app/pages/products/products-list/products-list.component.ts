import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService, Product } from '@eshop/products';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'admin-products-list',
  templateUrl: './products-list.component.html',
  styles: [
  ]
})
export class ProductsListComponent implements OnInit, OnDestroy {
  products: Product[] = [];

  endSubs$: Subject<any> = new Subject();

  constructor(
    private productsService: ProductsService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ){}

  ngOnInit(): void {
    this._getProducts();
  }

  ngOnDestroy(): void {
    this.endSubs$.complete();
  }

  private _getProducts() {
    this.productsService.getProducts().pipe(takeUntil(this.endSubs$)).subscribe(products => { 
      this.products = products;
    })
  }

  updateProduct(productId: string){
    this.router.navigateByUrl(`products/form/${productId}`);
  }

  deleteProduct(productId: string){
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this category?',
      header: 'Delete Category',
      icon: 'pi pi-exclamation-triangle',
      accept: () => this.productsService.deleteProduct(productId).pipe(takeUntil(this.endSubs$)).subscribe({
        next: () => {
          this._getProducts();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product is deleted' })},
        error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Product could not be deleted' }),
    }),
  });
  }
}
