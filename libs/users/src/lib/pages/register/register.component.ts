import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { User } from '../../models/user';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'users-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit, OnDestroy {
  form: FormGroup;
  isSubmitted = false;
  currentUserId: string;
  countries = [];

  endSubs$: Subject<any> = new Subject();

  constructor(
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._initUserForm();
    this._getCountries();
  }

  ngOnDestroy(): void {
    this.endSubs$.complete();
  }

  private _initUserForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      isAdmin: [false],
      street: [''],
      apartment: [''],
      zip: [''],
      city: [''],
      country: ['']
    });
  }

  private _getCountries(){
    this.countries = this.usersService.getCountries();
  }

  private _addUser(user: User){
    this.usersService.userCreateUser(user).pipe(takeUntil(this.endSubs$)).subscribe({
      next: () => this.messageService.add({ severity: 'success', summary: 'Success', detail: `User ${user.name} is created` }),
      error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'User could not be created' }),
      complete: () => setTimeout(() => this.goBack(), 2000)
  })}

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }
    const user: User = {
      id: this.currentUserId,
      name: this.userForm.name.value,
      email: this.userForm.email.value,
      password: this.userForm.password.value,
      phone: this.userForm.phone.value,
      isAdmin: this.userForm.isAdmin.value,
      street: this.userForm.street.value,
      apartment: this.userForm.apartment.value,
      zip: this.userForm.zip.value,
      city: this.userForm.city.value,
      country: this.userForm.country.value
    };  
    this._addUser(user);
  }

  goBack() {
    this.location.back();
  }

  get userForm() {
    return this.form.controls;
  }
}
