import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavToHomeService {
  private _showLoginForm = new BehaviorSubject<boolean>(false);

  showLoginForm$ = this._showLoginForm.asObservable();

  constructor() {}

  showLogin() {
    console.log('showLogin called');
    this._showLoginForm.next(!this._showLoginForm.value); // Inverse la valeur
  }

  hideForms() {
    this._showLoginForm.next(false);
  }
}

