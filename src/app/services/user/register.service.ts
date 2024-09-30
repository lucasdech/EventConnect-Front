import { registerLocaleData } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, tap, map } from 'rxjs';

export interface Credentials {
  name: string;
  email: string;
  profile_picture: string;
  password: string;
  confirm_password: string;
}

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private http = inject(HttpClient);
  private BASE_URL = "https://eventconnectapi.projets.p8.garage404.com";

  constructor() { }

 register(credentials: Credentials): Observable<boolean> {

    return this.http.post(this.BASE_URL + "/api/register", credentials).pipe(

      tap((result: any) => {
        console.log("result : " + result)
      }),
      map((result: any) => !!result.data)
    );
  }
}
