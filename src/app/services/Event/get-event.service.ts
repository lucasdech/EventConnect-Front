import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, map, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetEventService {

  private http = inject(HttpClient);
  private BASE_URL = "https://eventconnectapi.projets.p8.garage404.com";

  constructor() { }

  getEvent(eventId: number): Observable<any> {
    return this.http.get(`${this.BASE_URL}/api/event/${eventId}`).pipe(
      tap((result: any) => {
        if (result) {
          console.log('Événement récupéré :', result.data);
        } else {
          console.log('Aucun événement dans la requête');
        }
      }),
      catchError(error => {
        console.error('Erreur lors de la récupération de l\'événement', error);
        return of(null);
      }),
      map((result: any) => result?.data)
    );
  }
  
  deleteEvent(eventId: number): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/api/event/${eventId}`).pipe(
      tap((result: any) => {
        if (result) {
          console.log('Événement supprimé :', result.data);
        } else {
          console.log('Aucun événement dans la requête');
        }
      }),
      catchError(error => {
        console.error('Erreur lors de la suppression de l\'événement', error);
        return of(null);
      }),
      map((result: any) => result?.data)
    );
  }

  deleteParticipationEvent(eventId: number){
    return this.http.delete(`${this.BASE_URL}/api/MyEvent/${eventId}`).pipe(
      tap((result: any) => {
        if (result) {
          console.log('Participation supprimée :', result.data);
        } else {
          console.log('Aucune participation dans la requête');
        }
      }
    ),
  );
}

}
