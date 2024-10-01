import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyEventsService {

  private http = inject(HttpClient);
  private BASE_URL = "https://eventconnectapi.projets.p8.garage404.com";

  constructor() { }

  getUserEvents(): Observable<any[]> {
    return this.http.get<{ data: { 'User Event': any[] } }>(`${this.BASE_URL}/api/MyEvents`).pipe(
      map(response => response.data['User Event']),
      catchError(error => {
        console.error('Erreur lors de la récupération des événements', error);
        return of([]);
      })
    );
  }
}