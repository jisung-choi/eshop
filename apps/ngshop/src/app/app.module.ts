import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { NxWelcomeComponent } from "./nx-welcome.component";
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { MessagesComponent } from './shared/messages/messages.component';
import { UiModule } from "@eshop/ui";
import { NavComponent } from './shared/nav/nav.component';
import { ProductsModule } from "@eshop/products";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { OrdersModule } from "@eshop/orders";
import { ToastModule } from "primeng/toast";
import { MessageService } from "primeng/api";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { JwtInterceptor } from "@eshop/users";

const routes: Routes = [
  {path: '', component: HomePageComponent},
]

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent, HomePageComponent, HeaderComponent, FooterComponent, NavComponent, MessagesComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    UiModule,
    ProductsModule,
    UiModule,
    OrdersModule,
    ToastModule
  ],
  providers: [MessageService,  { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}],
  bootstrap: [AppComponent],
})
export class AppModule {}
