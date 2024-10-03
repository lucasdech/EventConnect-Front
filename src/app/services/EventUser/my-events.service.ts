import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyEventsService {
  private http = inject(HttpClient);
  private BASE_URL = "https://eventconnectapi.projets.p8.garage404.com";
  MyEvents = signal<any[]>([]);

  constructor() {
    this.loadEventsFromLocalStorage();
  }

  private loadEventsFromLocalStorage(): void {
    const storedEvents = localStorage.getItem("MyEvents");
    if (storedEvents) {
      this.MyEvents.set(JSON.parse(storedEvents)); 
    }
  }

  getUserEvents(): Observable<any[]> {
    return this.http.get<{ data: { 'User Event': any[] } }>(`${this.BASE_URL}/api/MyEvents`).pipe(
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