import { Component, inject } from '@angular/core';
import { ChatService } from '../../../services/EventUser/chat.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {

  private chatService = inject(ChatService);
  private route = inject(ActivatedRoute);

  public messages: any[] = [];
  public eventId: number = 0;
  public userId: number = 0;

  ngOnInit() {
    this.userId = +localStorage.getItem('ID')!;
    this.route.paramMap.subscribe(params => {
      this.eventId = +params.get('id')!;
      console.log('ID de l\'événement récupéré :', this.eventId);
      this.getMessages();
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
      }
    });
  }

}
