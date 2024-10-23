import { Component, inject } from '@angular/core';
import { ChatService } from '../../../services/EventUser/chat.service';
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
export class ChatComponent {
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
  
      this.messageForm.patchValue({ event_id: this.eventId });
      this.getMessages(); 
      this.subscribeToMessages();
    });
  }

  getMessages() {
    this.chatService.getMessages(this.eventId).subscribe({
      next: (data) => {
        this.messages = data;
        console.log('Messages récupérés COMPOSENT:', this.messages);
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des messages :', err);
      },
    });
  }
  

  subscribeToMessages() {
    this.chatService.subscribeToMessages(this.eventId, (newMessages) => {
      this.messages = newMessages;
      console.log('Messages mis à jour :', this.messages);
    });
  }

  sendMessage() {
    if (this.messageForm.invalid) return;

    console.log('Envoi du message :', this.messageForm.value);

    const messageData = {
      content: this.messageForm.value.content,
      event_id: this.eventId,
      user_id: this.userId,
    };

    this.chatService.addMessage(messageData).subscribe({
      next: (response: any) => {
        console.log('Message ajouté:', response);
        this.messageForm.reset({
          content: '', 
          event_id: this.eventId, 
          user_id: this.userId
        });
      },
      error: (err) => {
        console.error('Erreur lors de l\'envoi du message :', err);
        this.invalidCredentials = true;
      },
    });
  }

}
