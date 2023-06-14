import { inject, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CartService } from './services/cart.service';
import { CartIconComponent } from './components/cart-icon/cart-icon.component';
import { BadgeModule } from 'primeng/badge';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { FormsModule } from '@angular/forms';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { DropdownModule } from 'primeng/dropdown';
import { ReactiveFormsModule } from '@angular/forms';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { ThankYouComponent } from './pages/thank-you/thank-you.component';
import { AuthGuardService, UsersModule } from '@eshop/users';
import { TrackOrderComponent } from './pages/track-order/track-order.component';
import { UserIconComponent } from './components/user-icon/user-icon.component';
import { ToastModule } from 'primeng/toast';
import { CardModule} from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TagModule } from 'primeng/tag';
import { OrderDetailComponent } from './pages/order-detail/order-detail.component';

const routes: Routes = [
  {
    path: 'cart',
    component: CartPageComponent
  },
  {
    path: 'checkout',
    canActivate: [() => inject(AuthGuardService).customerCanActivate()],
    component: CheckoutPageComponent
  },
  {
    path: 'success',
    component: ThankYouComponent
  },
  {
    path: 'orders/:id',
    component: TrackOrderComponent
  },
  {
    path: 'orders/orderDetail/:id',
    component: OrderDetailComponent
  }
]

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), 
    RouterModule, 
    InputMaskModule, 
    InputTextModule, 
    BadgeModule, 
    ButtonModule, 
    InputNumberModule, 
    FormsModule, 
    DropdownModule, 
    ReactiveFormsModule,
    UsersModule,
    ToastModule,
    CardModule,
    TableModule,
    ConfirmDialogModule,
    TagModule
  ],
  declarations: [
    CartIconComponent,
    CartPageComponent,
    OrderSummaryComponent,
    CheckoutPageComponent,
    ThankYouComponent,
    TrackOrderComponent,
    UserIconComponent,
    OrderDetailComponent,
  ],
  exports: [
    CartIconComponent,
    CartPageComponent,
    OrderSummaryComponent,
    CheckoutPageComponent,
    ThankYouComponent,
    TrackOrderComponent,
    UserIconComponent,
    OrderDetailComponent
  ],
  providers: [MessageService, ConfirmationService,
  ],
})
export class OrdersModule {
  constructor(cartService: CartService){
    cartService.initCartLocalStorage();
  }
}
