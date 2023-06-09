import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { LocalStorageService } from '../../services/localstorage.service';

@Component({
  selector: 'users-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit, OnDestroy{
  loginFormGroup : FormGroup;
  isSubmitted = false;
  authError = false;
  authMessage = 'Email or password is wrong'
  endSubs$: Subject<any> = new Subject();

  constructor(
    private formBuilder: FormBuilder, 
    private auth: AuthService, 
    private localstorageService: LocalStorageService,
    private router: Router
    ){
    
  }

  ngOnInit(): void {
    this._initLoginForm();
  }

  ngOnDestroy(): void {
    this.endSubs$.complete();
  }

  private _initLoginForm() {
    this.loginFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  
  onSubmit() {
    this.isSubmitted = true;
    if(this.loginFormGroup.invalid) return;

    const loginData = {
      email: this.loginForm.email.value,
      password: this.loginForm.password.value
    }

    this.auth.login(loginData.email, loginData.password).pipe(takeUntil(this.endSubs$)).subscribe({
      next: (user) => {
          this.authError = false;
          this.localstorageService.setToken(user.token);
          this.router.navigate(['/']);
      },
      error: (error: HttpErrorResponse) => {
        this.authError = true
        if(error.status !== 400){
          this.authMessage = "Error in the Server, please try again later!"
        }},
    })
  }

  toRegisterPage() {
    this.router.navigate(['/register']);
  }

  get loginForm() {
    return this.loginFormGroup.controls;
  }
}
