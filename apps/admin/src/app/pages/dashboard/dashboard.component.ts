import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrdersService } from '@eshop/orders';
import { ProductsService } from '@eshop/products';
import { UsersService } from '@eshop/users';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy{
  orderCount: number;
  userCount: number;
  productCount: number;
  totalSales: number;

  endSubs$: Subject<any> = new Subject();


  constructor(
    private usersService: UsersService, 
    private ordersService: OrdersService, 
    private productsService: ProductsService,
    ){}

    ngOnInit(): void {
      this._getOrderCount();
      this._getTotalSales();
      this._getProductCount();
      this._getUserCount();
    }

    ngOnDestroy(): void {
      this.endSubs$.complete();
    }

    private _getOrderCount(){
      this.ordersService.getOrderCount().pipe(takeUntil(this.endSubs$)).subscribe(count => { 
        this.orderCount = count['orderCount']
      })
    }

    private _getTotalSales(){
      this.ordersService.getTotalSales().pipe(takeUntil(this.endSubs$)).subscribe(sales => { 
        this.totalSales = sales['totalSales']
      })
    }

    private _getProductCount() {
      this.productsService.getProductCount().pipe(takeUntil(this.endSubs$)).subscribe(count =>{
        this.productCount = count['productCount']
      })
    }

    private _getUserCount() {
      this.usersService.getUserCount().pipe(takeUntil(this.endSubs$)).subscribe(count => {
        this.userCount = count['userCount']
      })
    }
}
