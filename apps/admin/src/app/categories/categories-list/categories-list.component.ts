import { Component, OnInit } from '@angular/core';
import { CategoriesService, Category } from '@eshop/products'
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'admin-categories-list',
  templateUrl: './categories-list.component.html',
  styles: [
  ]
})
export class CategoriesListComponent implements OnInit{
  categories: Category[] = [];

  constructor(
    private categoriesService: CategoriesService,     
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    ){}

  ngOnInit(): void {
    this._getCategories()
  }
  deleteCategory(categoryId: string){
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this category?',
      header: 'Delete Category',
      icon: 'pi pi-exclamation-triangle',
      accept: () => this.categoriesService.deleteCategory(categoryId).subscribe({
        next: () => {
          this._getCategories();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Category is deleted' })},
        error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Category could not be deleted' }),
    }),
  });
  }

  private _getCategories() {
    this.categoriesService.getCategories().subscribe(cats => {
      this.categories = cats;
    })
  }
}

