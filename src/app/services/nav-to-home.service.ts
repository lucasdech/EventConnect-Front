import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavToHomeService {
  private _showLoginForm = new BehaviorSubject<boolean>(false);
  private _showRegisterForm = new BehaviorSubject<boolean>(false);

  showLoginForm$ = this._showLoginForm.asObservable();
  showRegisterForm$ = this._showRegisterForm.asObservable();

  constructor() {}

  showLogin() {
    console.log('showLogin called');
    if (this._showRegisterForm.value) {
      this._showRegisterForm.next(false);
    }
    this._showLoginForm.next(!this._showLoginForm.value);
  }

  showRegister() {
    console.log('showRegister called');
    if (this._showLoginForm.value) {
      this._showLoginForm.next(false);
    }
    this._showRegisterForm.next(!this._showRegisterForm.value);
  }

  hideForms() {
    this._showLoginForm.next(false);
    this._showRegisterForm.next(false);
  }
}

