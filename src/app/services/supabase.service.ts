import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Message {
  id: number;
  content: string;
  event_id: number;
  user_id: number;
  created_at: string;
}

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient;
  private messageSubject = new BehaviorSubject<Message[]>([]);

  constructor() {
    this.supabase = createClient(
      'https://egwnqsbqdugpatmobhcx.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVnd25xc2JxZHVncGF0bW9iaGN4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk2NzQ0MTEsImV4cCI6MjA0NTI1MDQxMX0._RGUbuzmuKXgSU39y7BXW6_O5_1xxedqCdg0M-4XE20',
      {
        auth: {
          persistSession: true,
          detectSessionInUrl: false,
          autoRefreshToken: true,
          storage: window.localStorage,
        },
        realtime: {
          params: {
            eventsPerSecond: 10,
          },
        },
      }
    );
    this.initializeSupabase();
  }

  private async initializeSupabase() {
    try {
      // Attendre un petit moment pour éviter les conflits de verrouillage
      await new Promise((resolve) => setTimeout(resolve, 100));
      await this.setupRealtimeSubscription();
    } catch (error) {
      console.error("Erreur lors de l'initialisation de Supabase:", error);
    }
  }

  private async setupRealtimeSubscription() {
    try {
      const channel = this.supabase.channel('messages-changes').on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'messages',
        },
        async (payload) => {
          await this.refreshMessages();
        }
      );

      await channel.subscribe();
      console.log('Subscription aux messages établie');
    } catch (error) {
      console.error('Erreur lors de la configuration du canal:', error);
    }
  }

  private async refreshMessages() {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const eventId = urlParams.get('event_id');

      console.log('Rafraîchissement des messages pour l’événement:', eventId);

      const { data, error } = await this.supabase
        .from('messages')
        .select('*')
        .eq('event_id', eventId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      if (data) {
        this.messageSubject.next(data);
      }
    } catch (error) {
      console.error('Erreur lors du rafraîchissement des messages:', error);
    }
  }

  getMessagesByEvent(eventId: number): Observable<Message[]> {
    this.supabase
      .from('messages')
      .select('*')
      .eq('event_id', eventId)
      .order('created_at', { ascending: true })
      .then(({ data, error }) => {
        if (error) {
          console.error('Erreur lors de la récupération des messages:', error);
          return;
        }
        if (data) {
          this.messageSubject.next(data);
        }
      });

    return this.messageSubject.asObservable();
  }

  async insertMessage(messageData: {
    content: string;
    event_id: number;
    user_id: number;
  }): Promise<Message | null> {
    try {
      const { data, error } = await this.supabase
        .from('messages')
        .insert(messageData)
        .select('*')
        .single();

      if (error) throw error;
      await this.refreshMessages();
      return data;
    } catch (error) {
      console.error("Erreur lors de l'insertion du message:", error);
      return null;
    }
  }

  cleanup() {
    try {
      const channel = this.supabase.channel('messages-changes');
      if (channel) {
        channel.unsubscribe();
      }
    } catch (error) {
      console.error('Erreur lors du nettoyage:', error);
    }
  }
}
