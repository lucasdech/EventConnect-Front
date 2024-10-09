import { Component, inject } from '@angular/core';
import { ChatService, Credentials } from '../../../services/EventUser/chat.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';


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

    this.getMessages();

    this.route.paramMap.subscribe((params) => {
      this.eventId = +params.get('id')!;
      console.log("ID de l'événement récupéré :", this.eventId);
      
      // Mettre à jour le champ event_id dans le formulaire
      this.messageForm.patchValue({ event_id: this.eventId });
      
      this.InitLaravelEcho();

    });
  }

  //ch mode 644 to 655

  InitPusher() {
    
    Pusher.logToConsole = true;
    var pusher = new Pusher('7c0ef57af2bc0573502d', {
      cluster: 'eu'
    });
    var channel = pusher.subscribe('chat' + this.eventId);
    channel.bind('NewMessage', function(data: any) {
      console.log(JSON.stringify(data));
    });
  }

  InitLaravelEcho () {

    /* @ts-ignore */
    
    window.Pusher = Pusher;

    const echo = new Echo({
      broadcaster: 'pusher',
      key: '7c0ef57af2bc0573502d',
    });

    /* @ts-ignore */
    window.Echo = echo

    echo.private(`chat.${this.eventId}`)
        .listen("NewMessage", (response: any) => {
          console.log(response)
          // this.messages.push(response.message)
          // messages.value.push(response.message);
    })

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
             
          console.log('Message ajouté:', response);
          
          
          this.messageForm.reset({ 
            content: '', 
            event_id: this.eventId, 
            user_id: this.userId
          });
          
          this.getMessages();

      },
      error: (err) => {
        console.error('Erreur lors de l\'envoi du message :', err);
        this.invalidCredentials = true;
      },
    });
  }
  
  
}
