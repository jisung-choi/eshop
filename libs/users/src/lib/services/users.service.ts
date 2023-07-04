import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { User } from '../models/user';
import { environment } from '../../environment';
import * as countriesLib from "i18n-iso-countries";
import { UsersFacade } from '../state/users.facade';

declare const require;

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  apiURLUsers = environment.apiURL + 'users';

  constructor(private http: HttpClient, private usersFacade: UsersFacade) {
      countriesLib.registerLocale(require("i18n-iso-countries/langs/en.json"));
    }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiURLUsers);
  }

  getUser(userId: string): Observable<User> {
    return this.http.get<User>(`${this.apiURLUsers}/${userId}`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiURLUsers, user);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiURLUsers}/${user.id}`, user);
  }

  deleteUser(userId: string): Observable<object> {
    return this.http.delete<object>(`${this.apiURLUsers}/${userId}`);
  }

  getCountries(): { id: string; name: string }[] {
    return Object.entries(countriesLib.getNames('en', { select: 'official' })).map((entry) => {
      return {
        id: entry[0],
        name: entry[1]
      };
    });
  }
  getCountry(countryKey: string): string {
    return countriesLib.getName(countryKey, 'en');
  }

  getUserCount(): Observable<number>{
    return this.http.get<number>(`${this.apiURLUsers}/get/count`);
  }

  initAppSession() {
    this.usersFacade.buildUserSession();
  }

  observeCurrentUser() {
    return this.usersFacade.currentUser$;
  }

  isCurrentUserAuth() {
    return this.usersFacade.isAuthenticated$;
  }

  //non-admin can call this api with its own userId
  userGetUser(userId: string): Observable<User> {
    return this.http.get<User>(`${this.apiURLUsers}/info/${userId}`);
  }

  userCreateUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiURLUsers}/register`, user);
  }
}
