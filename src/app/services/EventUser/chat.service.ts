import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { SupabaseService, Message } from '../supabase.service';

export interface MessageInput {
  content: string;
  event_id: number;
  user_id: number;
}

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private http = inject(HttpClient);
  private BASE_URL = 'https://eventconnectapi.projets.p8.garage404.com/api';

  constructor(private supabaseService: SupabaseService) {}

  getMessages(eventId: number): Observable<Message[]> {
    return this.http.get<any>(`${this.BASE_URL}/messages/${eventId}`).pipe(
      tap((result) => {
        console.log('Réponse Messages SERVICE:', result.data);
      }),
      map((result) => result.data.SupabaseMessage)
    );
  }

  addMessage(messageInput: MessageInput): Observable<boolean> {
    return this.http.post(`${this.BASE_URL}/message`, messageInput).pipe(
      tap((result) => {
        console.log('Message ajouté:', result);
        // await this.supabaseService.insertMessage(messageInput);
      }),
      map((result: any) => result)
    );
  }

  subscribeToMessages(eventId: number, callback: (messages: Message[]) => void) {
    return this.supabaseService.getMessagesByEvent(eventId).subscribe(callback);
  }
}