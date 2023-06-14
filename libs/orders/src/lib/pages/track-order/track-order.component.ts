import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from '../../models/order';
import { OrdersService } from '../../services/orders.service';
import { ORDER_STATUS } from '../../order.constants';
import { ConfirmationService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { LocalStorageService } from '@eshop/users';

@Component({
  selector: 'orders-track-order',
  templateUrl: './track-order.component.html',
  styles: [
  ]
})
export class TrackOrderComponent implements OnInit, OnDestroy{
  
  orderStatus = ORDER_STATUS;
  orderItem: Order[] = [];
  endSubs$: Subject<any> = new Subject();
  userId = "";
  
  constructor(
    private ordersService: OrdersService, 
    private route: ActivatedRoute,     
    private router: Router,
    private confirmationService: ConfirmationService,
    private localStorageService: LocalStorageService
    ) {return}
  
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.userId = params.id
    })
    this._getOrders();
  }

  ngOnDestroy(): void {
    this.endSubs$.complete();
  }

  private _getOrders(){
    this.ordersService.getOrdersByUser(this.userId).pipe(takeUntil(this.endSubs$)).subscribe((orders) => {
      this.orderItem = orders;
    }) 
  }

  viewOrder(orderId: string){
    this.router.navigateByUrl(`orders/orderDetail/${orderId}`);
  }

  logOut(){
    this.confirmationService.confirm({
      message: 'Are you sure that you want log out?',
      header: 'Logging Out',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.localStorageService.removeToken();
        this.router.navigateByUrl('');
      }
  });
  }
}
