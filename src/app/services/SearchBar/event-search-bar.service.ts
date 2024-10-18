import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventSearchBarService {

  private http = inject(HttpClient);
  private BASE_URL = "https://eventconnectapi.projets.p8.garage404.com";

  constructor() { }

  verifiedPassWord = (eventId: number, password: string) => {
    return this.http.get(`${this.BASE_URL}/api/event/${eventId}/verifiedpw`, {
      params: { password }
    }).pipe(
      tap((result: any) => {
        console.log('Mot de passe vérifié :', result);
      }),
      map((result: any) => {
        return result;
      })
    );
  }

}
