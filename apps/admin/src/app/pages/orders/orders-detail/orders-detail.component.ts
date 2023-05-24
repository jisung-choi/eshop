import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order, OrdersService, ORDER_STATUS } from '@eshop/orders';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'admin-orders-detail',
  templateUrl: './orders-detail.component.html',
  styles: [
  ]
})
export class OrdersDetailComponent implements OnInit, OnDestroy {
  order: Order;
  orderStatuses = [];
  selectedStatus: any;
  endSubs$: Subject<any> = new Subject();

  constructor(
    private ordersService: OrdersService,
    private route: ActivatedRoute,
    private location: Location,
    private messageService: MessageService,
  ){}

  ngOnInit(): void {
    this._mapOrderStatus();
    this._getOrder();
  }

  ngOnDestroy(): void {
    this.endSubs$.complete();
  }
  
  private _mapOrderStatus(){
    this.orderStatuses = Object.keys(ORDER_STATUS).map(key => {
      return {
        id: key,
        name: ORDER_STATUS[key].label
      }
    })
  }

  private _getOrder(){
    this.route.params.subscribe(params => {
      if(params.id){
        this.ordersService.getOrder(params.id).pipe(takeUntil(this.endSubs$)).subscribe(order => {
          this.order = order;
        })
      }
    })
  }

  onStatusChange(event) {
    this.ordersService.updateOrder({status: event.value}, this.order.id).pipe(takeUntil(this.endSubs$)).subscribe({
      next: () => this.messageService.add({ severity: 'success', summary: 'Success', detail: `Order is updated` }),
      error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Order could not be updated' }),
      complete: () => setTimeout(() => this.location.back(), 2000)
  })}
}
