import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';

export interface Credentials {
  content: string;
  event_id: number;
}

@Injectable({
  providedIn: 'root',
})

export class ChatService {
  private http = inject(HttpClient);
  private BASE_URL = 'https://eventconnectapi.projets.p8.garage404.com/api';

  constructor() {}

  getMessages(eventId: number) {
    console.log("Récupération des messages pour l'événement", eventId);
    return this.http.get(`${this.BASE_URL}/messages/${eventId}`).pipe(
      tap((result: any) => {
        console.log('Réponse Messages:', result);
      }),
      map((result: any) => {
        if (result.data && Array.isArray(result.data.messages)) {
          return result.data.messages;
        } else {
          console.error(
            'Les messages ne sont pas définis ou ne sont pas dans un tableau'
          );
          return [];
        }
      })
    );
  }

  addMessage(credentials: Credentials): Observable<boolean>  {
    return this.http.post(`${this.BASE_URL}/message`, credentials).pipe(
      tap((result: any) => {
        console.log('Message ajouté:', result);
      }),
      map((result: any) => {
        if (result.success) {
          return result.data;
        } else {
          console.error("Erreur lors de l'ajout du message");
          return null;
        }
      })
    );
  }
}
