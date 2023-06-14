import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '@eshop/users';

@Component({
  selector: 'orders-user-icon',
  templateUrl: './user-icon.component.html',
  styles: [
  ]
})
export class UserIconComponent implements OnInit{
  userId = "";

  constructor(private localStorageService: LocalStorageService, private router: Router){return}

  ngOnInit(): void {
    this.loadUserId();
  }

  loadUserId(){
    this.userId = "";
    this.userId = this.localStorageService.getUserIdFromToken();
  }

  takeToUser(): string{
    this.loadUserId();
    if(this.userId !== null){
      return `/orders/${this.userId}`;
    } else {
      return '/login';
    }
  }
}
