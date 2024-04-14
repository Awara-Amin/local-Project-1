import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
// import { constants } from '../constants/constants';

export const constants = {
  CURRENT_TOKEN: 'CURRENT_TOKEN',
};

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  isAuthentication: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  //
  constructor() {
    const token = this.getToken();
    if (token) {
      this.updateToken(true);
    }
  }

  //
  updateToken(status: boolean) {
    this.isAuthentication.next(status);
  }

  setToken(token: string) {
    if (!token) {
      return;
    }
    this.updateToken(true);
    localStorage.setItem(constants.CURRENT_TOKEN, token);
  }

   getToken(): string | null {
    let currentToken=null;
     if (typeof localStorage !== 'undefined') {
     currentToken = localStorage?.getItem(constants.CURRENT_TOKEN);
  }
    return currentToken ;
    // localStorage.getItem(constants.CURRENT_TOKEN);
  }

  removeToken() {
    this.updateToken(false);
    localStorage.removeItem(constants.CURRENT_TOKEN);
  }
}
