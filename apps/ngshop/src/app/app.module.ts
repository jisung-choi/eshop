import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { NxWelcomeComponent } from "./nx-welcome.component";
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { UiModule } from "@eshop/ui";
import { NavComponent } from './shared/nav/nav.component';
import { ProductsModule } from "@eshop/products";
import { HttpClientModule } from "@angular/common/http";

const routes: Routes = [
  {path: '', component: HomePageComponent},
]

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent, HomePageComponent, HeaderComponent, FooterComponent, NavComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    UiModule,
    ProductsModule,
    UiModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
