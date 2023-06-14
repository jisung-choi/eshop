import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../../models/category';
import { Product } from '../../models/product';
import { CategoriesService } from '../../services/categories.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'products-list',
  templateUrl: './products-list.component.html',
  styles: [
  ]
})
export class ProductsListComponent implements OnInit{

  products: Product[] = [];
  categories: Category[] = [];
  selectedCategory: string;

  constructor(private productsService: ProductsService, private categoriesService: CategoriesService, private route: ActivatedRoute){}

  ngOnInit(): void {
    this._getCategories();
    this.route.params.subscribe((params) => {
      params.categoryid ? this._getProducts([params.categoryid]) : this._getProducts();
      if(params.categoryid) this.selectedCategory = params.categoryid;
      console.log(params.categoryid)
    })
    if(this.selectedCategory){
      this.initBoxes();
    }
  }

  private _getCategories(){
    this.categoriesService.getCategories().subscribe(categories => {
      this.categories = categories;
    })
  }

  private _getProducts(categoriesFilter?: string[]){
    this.productsService.getProducts(categoriesFilter).subscribe(products => {
      this.products = products;
    })
  }

  categoryFilter(){
    const selectedCategories = this.categories.filter((category) => category.checked).map((category) => category.id)
    this._getProducts(selectedCategories);
  }

  async initBoxes(){
    await this.waitUntil(() => {
      return this.categories.length > 0;
    }, 10)
    this.categories.forEach(category => {
      if(category.id == this.selectedCategory){
        category.checked = true;
      }
    })
  }

  waitUntil(condition: () => boolean, maxAttempts: number): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      let attempts = 0;
  
      const checkCondition = () => {
        attempts++;
  
        if (condition()) {
          resolve();
        } else if (attempts >= maxAttempts) {
          reject(new Error('Exceeded maximum attempts'));
        } else {
          setTimeout(checkCondition, 100); // Check again after 100 milliseconds
        }
      };
  
      checkCondition();
    });
  }
}
