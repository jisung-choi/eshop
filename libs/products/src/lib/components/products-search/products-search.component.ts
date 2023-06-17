import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'products-search',
  templateUrl: './products-search.component.html',
  styles: [
  ]
})
export class ProductsSearchComponent {

  constructor(private router: Router)
  {return}

  searchWord = "";

  onEnter(event: KeyboardEvent) {
    if(event.key === "Enter"){
      this.searchWord = (event.target as HTMLInputElement).value;
      this.router.navigateByUrl(`/products/search/${this.searchWord}`);
    }  
  }
}
