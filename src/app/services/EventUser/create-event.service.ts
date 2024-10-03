import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap, map } from 'rxjs';

export interface Credentials {
  user_id: number;
  location: string;
  description: string;
  title: string;
  starting_at: Date;
  is_private: boolean;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class CreateEventService {
  private http = inject(HttpClient);
  private BASE_URL = "https://eventconnectapi.projets.p8.garage404.com";

  constructor() { }

  createEvent(credentials: Credentials): Observable<number> {
    return this.http.post(this.BASE_URL + "/api/event", credentials).pipe(
      tap((result: any) => {
        if (result) {
          console.log('Événement créé avec ID :', result.data.event.id);
          localStorage.setItem("MyEvents", JSON.stringify(result.data));
        } else {
          console.log('Aucun événement dans la requête');
        }
      }),
      map((result: any) => result.data.event.id)
    );
  }

  participateInEvent(eventId: number): Observable<any> {
    const userId = localStorage.getItem('ID')
    console.log(userId)
    const body = { event_id: eventId, user_id: 41};
    console.log(body);
    return this.http.post(`${this.BASE_URL}/api/MyEvent/participate`, body).pipe(
      tap((result: any) => {
        if (result) {
          console.log('Participation à l\'événement réussie :', result);
          location.reload()
        } else {
          console.log('Participation à l\'événement échouée');
        }
      })
    );
  }
}
