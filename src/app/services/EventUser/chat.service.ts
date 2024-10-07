import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private http = inject(HttpClient);
  private BASE_URL = "https://eventconnectapi.projets.p8.garage404.com/api";

  constructor() { }

  getMessages(eventId: number) {
    console.log('Récupération des messages pour l\'événement', eventId);
    return this.http.get(`${this.BASE_URL}/messages/${eventId}`).pipe(
      tap((result: any) => {
        console.log('Réponse Messages:', result);
      }),
      map((result: any) => {
        if (Array.isArray(result?.data['Messages'])) {
          return result.data['Messages'];
        } else {
          console.error('La réponse n\'est pas un tableau valide');
          return [];
        }
      }
    ));
  }
}
