import { Component } from '@angular/core';
import { AuthService } from '@eshop/users';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'admin-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  constructor(private authService: AuthService, private confirmationService: ConfirmationService) {}

  logoutUser() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to Logout?',
      header: 'User Logout',
      icon: 'pi pi-exclamation-triangle',
      accept: () => this.authService.logout()
  })
}
}
