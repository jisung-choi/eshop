import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order, OrdersService, ORDER_STATUS } from '@eshop/orders';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'orders-order-detail',
  templateUrl: './order-detail.component.html',
  styles: [
  ]
})
export class OrderDetailComponent implements OnInit, OnDestroy{
  orderStatus = ORDER_STATUS;
  order: Order;
  endSubs$: Subject<any> = new Subject();

  constructor(
    private ordersService: OrdersService,
    private route: ActivatedRoute,
    private location: Location,
  ){}

  ngOnInit(): void {
    this._getOrder();
  }

  ngOnDestroy(): void {
    this.endSubs$.complete();
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

  goBack(){
    this.location.back();
  }
}
