import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { User, UsersService } from '@eshop/users';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'admin-users-list',
  templateUrl: './users-list.component.html',
  styles: []
})
export class UsersListComponent implements OnInit, OnDestroy {
  users: User[] = [];

  endSubs$: Subject<any> = new Subject();

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

  ngOnDestroy(): void {
    this.endSubs$.complete();
  }

  private _getUsers() {
    this.usersService.getUsers().pipe(takeUntil(this.endSubs$)).subscribe((users) => {
      this.users = users;
    });
  }

  deleteUser(userId: string) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this user?',
      header: 'Delete User',
      icon: 'pi pi-exclamation-triangle',
      accept: () => this.usersService.deleteUser(userId).pipe(takeUntil(this.endSubs$)).subscribe({
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
