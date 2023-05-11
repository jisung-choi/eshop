import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService, Category } from '@eshop/products'
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'admin-categories-list',
  templateUrl: './categories-list.component.html',
  styles: [
  ]
})
export class CategoriesListComponent implements OnInit, OnDestroy{
  categories: Category[] = [];
  endSubs$: Subject<any> = new Subject();

  constructor(
    private categoriesService: CategoriesService,     
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router,
    ){}

  ngOnInit(): void {
    this._getCategories()
  }

  ngOnDestroy(): void {
    this.endSubs$.complete();
  }

  deleteCategory(categoryId: string){
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this category?',
      header: 'Delete Category',
      icon: 'pi pi-exclamation-triangle',
      accept: () => this.categoriesService.deleteCategory(categoryId).pipe(takeUntil(this.endSubs$)).subscribe({
        next: () => {
          this._getCategories();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Category is deleted' })},
        error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Category could not be deleted' }),
    }),
  });
  }
  
  updateCategory(categoryId: string){
    this.router.navigateByUrl(`categories/form/${categoryId}`)
  }

  private _getCategories() {
    this.categoriesService.getCategories().pipe(takeUntil(this.endSubs$)).subscribe(cats => {
      this.categories = cats;
    })
  }
}

