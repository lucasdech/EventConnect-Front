import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParticipantsService {

  private http = inject(HttpClient);
  private BASE_URL = "https://eventconnectapi.projets.p8.garage404.com/api";

  constructor() { }

  getUsersInEvent(eventId: number) {
    return this.http.get(`${this.BASE_URL}/MyEvent/${eventId}`).pipe(
      tap((result: any) => {
        console.log('Réponse Participants:', result);
      }),
      map((result: any) => {
      
        if (Array.isArray(result?.data['User Event'])) {
          return result.data['User Event'].map((participant: any) => participant.user);
        } else {
          console.error('La réponse n\'est pas un tableau valide');
          return [];
        }
      })
    );
  }

  deleteParticipant(participantId: number) {
    return this.http.delete(`${this.BASE_URL}/MyEvent/${participantId}`).pipe(
      tap((result: any) => {
        console.log('Réponse suppression participant:', result);
      }),
      map((result: any) => {
        return result;
      })
    );
  }
}
