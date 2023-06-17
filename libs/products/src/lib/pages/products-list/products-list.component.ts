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
  productFound = true;
  searchWord = ''

  constructor(private productsService: ProductsService, private categoriesService: CategoriesService, private route: ActivatedRoute){}

  ngOnInit(): void {
    this._getCategories();
    this.route.params.subscribe((params) => {
      if(params.searchWord){
        this.searchWord = params.searchWord;
        this._getSearchedProducts(params.searchWord, 10);
        return;
      }
      params.categoryid ? this._getProducts([params.categoryid]) : this._getProducts();
      if(params.categoryid) this.selectedCategory = params.categoryid;
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

  private _getSearchedProducts(searchWord: string, numberOfProducts: number){ 
    this.productsService.getProducts().subscribe(products => {
      this.quickSelection(searchWord, products, numberOfProducts);
    })
  }

  async quickSelection(searchWord: string, searchedProducts: Product[], k: number){
    //Filter only the products with the given string in its name
    const includedProducts: Product[] = searchedProducts.filter((product) => product.name.includes(searchWord));
    try {
      await this.waitUntil(() => {
        return includedProducts.length > 0;
      }, 5);  
      }catch (error){
        this._getProducts();        
        this.productFound = false;
    }
    this.products = this.quickSelectHelper(includedProducts, k)
    //Implement Quick Selection Algorithm here - Order based on price
  }

  categoryFilter(){
    const selectedCategories = this.categories.filter((category) => category.checked).map((category) => category.id)
    this._getProducts(selectedCategories);
  }

  async initBoxes(){
    await this.waitUntil(() => {
      return this.categories.length > 0;
    }, 5)
    this.categories.forEach(category => {
      if(category.id == this.selectedCategory){
        category.checked = true;
      }
    })
  }

  quickSelectHelper(products: Product[], k: number): Product[] {
    if (products.length === 0 || k <= 0) {
      return [];
    }

    const pivot = this.findMedianOfMedians(products);
    const greater: Product[] = [];
    const equal: Product[] = [];
  
    for (const product of products) {
      if (product.price > pivot.price) {
        greater.push(product);
      } else if (product.price === pivot.price) {
        equal.push(product);
      }
    }
  
    if (greater.length >= k) {
      return this.quickSelectHelper(greater, k);
    } else if (greater.length === k - 1) {
      return [...greater, ...equal];
    } else {
      const lesser: Product[] = [];
      for (const product of products) {
        if (product.price < pivot.price) {
          lesser.push(product);
        }
      }
      return [...this.quickSelectHelper(greater, k - greater.length), ...equal, ...this.quickSelectHelper(lesser, k - greater.length - equal.length)];
    }
  }

  //prevents worst case scenario by finding approx median pivot point
  findMedianOfMedians(products: Product[]): Product {
    if (products.length <= 5) {
      return products.sort()[Math.floor(products.length / 2)];
    }

    const sublists: Product[][] = [];
      for (let i = 0; i < products.length; i += 5) {
        sublists.push(products.slice(i, i + 5));
     }

    const medians: Product[] = [];
     for (const sublist of sublists) {
        medians.push(this.findMedian(sublist));
    }

  return this.findMedianOfMedians(medians);
}

findMedian(products: Product[]): Product {
  products.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
  return products[Math.floor(products.length / 2)];
}



  //Helper function for initBoxes to execute in order
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
          setTimeout(checkCondition, 100); // Check again after 1000 milliseconds
        }
      };
  
      checkCondition();
    });
  }
}
