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
    this._showLoginForm.next(!this._showLoginForm.value); // Inverse la valeur
  }

  showRegister() {
    console.log('showRegister called');
    this._showRegisterForm.next(!this._showRegisterForm.value); // Inverse la valeur
  }

  hideForms() {
    this._showLoginForm.next(false);
  }
}

