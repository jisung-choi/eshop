import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'ui-banner',
  templateUrl: './banner.component.html',
  styles: [
  ]
})
export class BannerComponent {
  constructor(private router: Router){return}

  onClickSeeMore(){
    this.router.navigateByUrl(`/products`);
  }
}
