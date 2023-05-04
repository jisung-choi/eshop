import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { User, UsersService } from '@eshop/users';

@Component({
  selector: 'admin-users-list',
  templateUrl: './users-list.component.html',
  styles: []
})
export class UsersListComponent implements OnInit {
  users: User[] = [];

  constructor(
    private usersService: UsersService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
    
  ) {}

  ngOnInit(): void {
    this._getUsers();
    this.usersService.getCountries();
  }

  private _getUsers() {
    this.usersService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }

  deleteUser(userId: string) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this user?',
      header: 'Delete User',
      icon: 'pi pi-exclamation-triangle',
      accept: () => this.usersService.deleteUser(userId).subscribe({
        next: () => {
          this._getUsers();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User is deleted' })},
        error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'User could not be deleted' }),
    }),
  });
  }

  updateUser(userid: string) {
    this.router.navigateByUrl(`users/form/${userid}`);
  }
  
  getCountry(countryKey: string): string {
    return this.usersService.getCountry(countryKey);
  }
}
