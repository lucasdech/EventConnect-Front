import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, tap, map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GetMyAccountService {

  private http = inject(HttpClient);
  private BASE_URL = "https://eventconnectapi.projets.p8.garage404.com";
  private userId = localStorage.getItem('ID');

  constructor() { }

  getMyAccount() {
    return this.http.get(`${this.BASE_URL}/api/user/${this.userId}`).pipe(
      tap((result: any) => {
        if (result) {
          console.log('Compte récupéré :', result.data.user);
        } else {
          console.log('Aucun compte dans la requête');
        }
      }),
      map((result: any) => result?.data)
    );
  }

  UpdateMyAccount(data: any) {
    return this.http.put(`${this.BASE_URL}/api/user/${this.userId}`, data).pipe(
      tap((result: any) => {
        if (result) {
          console.log('Compte modifié :', result.data.user);
        } else {
          console.log('Aucun compte dans la requête');
        }
      }),
      map((result: any) => result?.data)
    );
  }

}
