import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, tap, map } from 'rxjs';

export interface Credentials {
  name: string;
  email: string;
  profile_picture: File;  // Changer ici pour un fichier
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

  userId = localStorage.getItem('ID');

  constructor() { }

  register(credentials: Credentials): Observable<boolean> {
    const formData = new FormData();
    
    // Ajoute les données au FormData
    formData.append('name', credentials.name);
    formData.append('email', credentials.email);
    formData.append('profile_picture', credentials.profile_picture); // Assurez-vous que c'est bien le fichier
    formData.append('password', credentials.password);
    formData.append('confirm_password', credentials.confirm_password);

    return this.http.post(this.BASE_URL + "/api/register", formData).pipe(
      tap((result: any) => {
        if (result && result.data['token']) {
          localStorage.setItem('ID', "");
          localStorage.setItem("MyEvents", "");
          localStorage.setItem("ID", result.data['user'].id);
          localStorage.setItem("JWT", result.data['token']);
          this.token.set(result.data['token']);
        } else {
          console.error('Aucun token dans la réponse');
        }
      }),
      map((result: any) => !!result.data)
    );
  }

  updateProfile(credentials: Credentials): Observable<boolean> {
    const formData = new FormData();
    
    console.table(credentials);
    console.log(formData)
    return this.http.put(this.BASE_URL + `/api/user/${this.userId}`, formData).pipe(
      tap((result: any)=> {
        console.log(result);
      }),
      map((result: any) => !!result.data)
    );
  }

}
