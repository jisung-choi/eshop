import { Component, OnInit } from '@angular/core';
import { OrdersService } from '@eshop/orders';
import { ProductsService } from '@eshop/products';
import { UsersService } from '@eshop/users';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit{
  orderCount: number;
  userCount: number;
  productCount: number;
  totalSales: number;

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

    private _getOrderCount(){
      this.ordersService.getOrderCount().subscribe(count => { 
        this.orderCount = count['orderCount']
      })
    }

    private _getTotalSales(){
      this.ordersService.getTotalSales().subscribe(sales => { 
        this.totalSales = sales['totalSales']
      })
    }

    private _getProductCount() {
      this.productsService.getProductCount().subscribe(count =>{
        this.productCount = count['productCount']
      })
    }

    private _getUserCount() {
      this.usersService.getUserCount().subscribe(count => {
        this.userCount = count['userCount']
      })
    }
}
