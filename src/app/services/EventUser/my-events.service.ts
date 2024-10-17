import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyEventsService {
  private http: HttpClient;
  private BASE_URL = "https://eventconnectapi.projets.p8.garage404.com";
  MyEvents = signal<any[]>([]);

  constructor(http: HttpClient) {
    this.http = http;
    this.loadEventsFromLocalStorage();
  }

  loadEventsFromLocalStorage(): void {
    const participants = localStorage.getItem("Participants");
    if (participants) {
      localStorage.setItem("Participants", JSON.stringify([]));
    }
    const storedEvents = localStorage.getItem("MyEvents");
    if (storedEvents) {
      this.MyEvents.set(JSON.parse(storedEvents)); 
    }
  }

  getUserEvents(query: string = ''): Observable<any[]> {
    return this.http.get<{ data: { 'User Event': any[] } }>(`${this.BASE_URL}/api/MyEvents` + query).pipe(
      tap((result: any) => {
        if (result) {
          localStorage.setItem("MyEvents", JSON.stringify(result.data['User Event'])); 
          this.MyEvents.set(result.data['User Event']);
        } else {
          console.log('Aucun MyEvents dans la réponse');
        }
      }),
      map((result: any) => result.data['User Event']),
      catchError((error) => {
        console.error('Erreur lors de la récupération des événements', error);
        return of(this.MyEvents());
      })
    );
  }
}
