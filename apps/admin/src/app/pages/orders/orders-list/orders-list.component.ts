import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order, OrdersService, ORDER_STATUS } from '@eshop/orders';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'admin-orders-list',
  templateUrl: './orders-list.component.html',
  styles: [
  ]
})
export class OrdersListComponent implements OnInit, OnDestroy{
  orders: Order[] = [];
  orderStatus = ORDER_STATUS;
  endSubs$: Subject<any> = new Subject();
  
  constructor(
    private ordersService: OrdersService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
    ){
  }

  ngOnInit(): void {
      this._getOrders();
  }

  ngOnDestroy(): void {
    this.endSubs$.complete();
  }

  private _getOrders(){
    this.ordersService.getOrders().pipe(takeUntil(this.endSubs$)).subscribe(orders => { 
      this.orders = orders;
    })
  }

  viewOrder(orderId: string){
    this.router.navigateByUrl(`orders/${orderId}`);
  }

  deleteOrder(orderId: string){
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this category?',
      header: 'Delete Category',
      icon: 'pi pi-exclamation-triangle',
      accept: () => this.ordersService.deleteOrder(orderId).pipe(takeUntil(this.endSubs$)).subscribe({
        next: () => {
          this._getOrders();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Order is deleted' })},
        error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Order could not be deleted' }),
    }),
  });
  }
}
