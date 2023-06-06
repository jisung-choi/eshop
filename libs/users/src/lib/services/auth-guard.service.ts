import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService{

  constructor(private router: Router, private localstorageService: LocalStorageService) {}

  canActivate(){
    const token = this.localstorageService.getToken();

    if(token){
      const tokenDecode = JSON.parse(atob(token.split('.')[1]));
      console.log(tokenDecode.isAdmin);
      console.log(tokenDecode.exp);
      if(tokenDecode.isAdmin && !this._tokenExpired(tokenDecode.exp)) return true;
    }
    this.router.navigate(['/login']);
    return false;
  }

  customerCanActivate(){
    const token = this.localstorageService.getToken();

    if(token){
      const tokenDecode = JSON.parse(atob(token.split('.')[1]));
      console.log(tokenDecode.isAdmin);
      console.log(tokenDecode.exp);
      if(!this._tokenExpired(tokenDecode.exp)) return true;
    }
    this.router.navigate(['/login']);
    return false;
  }

  private _tokenExpired(expiration): boolean {
    return Math.floor(new Date().getTime() / 1000) >= expiration;
  }
}
