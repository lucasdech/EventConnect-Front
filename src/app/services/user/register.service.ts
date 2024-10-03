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

  token = signal<string | null>(null);

  constructor() { }

 register(credentials: Credentials): Observable<boolean> {
    return this.http.post(this.BASE_URL + "/api/register", credentials).pipe(
      tap((result: any) => {
        if (result && result.data['token']) {
          localStorage.setItem('ID', "")
          localStorage.setItem("ID", result.data['user'].id)
          localStorage.setItem("MyEvents", "")
          localStorage.setItem("JWT", result.data['token']);
          this.token.set(result.data['token']);
        } else {
          console.error('Aucun token dans la réponse');
        }
      }),
      map((result: any) => !!result.data)
    );
  }
}
