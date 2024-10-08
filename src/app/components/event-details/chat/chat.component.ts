import { Component, inject, OnInit } from '@angular/core';
import { ChatService, Credentials } from '../../../services/EventUser/chat.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  private chatService = inject(ChatService);
  private route = inject(ActivatedRoute);

  messageForm: FormGroup;
  invalidCredentials = false;

  public messages: any[] = [];
  public eventId: number = 0;
  public userId: number = +localStorage.getItem('ID')!;

  constructor(private fb: FormBuilder) {
    this.messageForm = this.fb.group({
      content: ['', Validators.required],
      event_id: [this.eventId, Validators.required],
      user_id: [this.userId, Validators.required],
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.eventId = +params.get('id')!;
      console.log("ID de l'événement récupéré :", this.eventId);
      
      // Mettre à jour le champ event_id dans le formulaire
      this.messageForm.patchValue({ event_id: this.eventId });
      
      // Récupérer les messages initiaux
      this.getMessages();
      
      // S'abonner aux messages en temps réel
      this.chatService.subscribeToMessages(this.eventId, (message: any) => {
        this.messages.push(message); // Ajouter le nouveau message à la liste
        console.log('Nouveau message reçu:', message);
      });
    });
  }
  

  getMessages() {
    this.chatService.getMessages(this.eventId).subscribe({
      next: (data) => {
        this.messages = data;
        console.log('Messages récupérés :', this.messages);
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des messages :', err);
      },
    });
  }

  sendMessage() {
    if (this.messageForm.invalid) return;
  
    console.log('Envoi du message :', this.messageForm.value);
  
    this.chatService.addMessage(this.messageForm.value as Credentials).subscribe({
      next: (response: any) => {
        // Vérifie si la réponse contient le statut 'success'      
        console.log('Message ajouté:', response);
        
        // Vider le champ d'input après l'envoi du message
        this.messageForm.reset({ 
          content: '', 
          event_id: this.eventId, 
          user_id: this.userId
        });
        
        // Réactualiser la liste des messages après l'envoi
        this.getMessages();
      },
      error: (err) => {
        console.error('Erreur lors de l\'envoi du message :', err);
        this.invalidCredentials = true;
      },
    });
  }
}
