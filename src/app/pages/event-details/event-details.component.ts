import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetEventService } from '../../services/Event/get-event.service';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';
import { ChatComponent } from '../../components/event-details/chat/chat.component';
import { ParticipantsComponent } from '../../components/event-details/participants/participants.component';
import { Router } from '@angular/router';
import { MyEventsService } from '../../services/EventUser/my-events.service';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [CommonModule, RouterModule, ChatComponent, ParticipantsComponent],
  providers: [MyEventsService],
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {

  eventDetails: any;
  UserId = +(localStorage.getItem('ID') || 0);

  constructor(private getEventService: GetEventService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.isConnectedUser();
    this.getEventDetails();
    setTimeout(() => {
      this.isUserInEvent();
    }, 800);
  }

  isConnectedUser() {
    if (!localStorage.getItem('JWT')) {
      this.router.navigate(['/']);
    }
  }

  isUserInEvent() {
    const participants = localStorage.getItem('Participants');
    const userId = localStorage.getItem('ID');

    if (participants && userId) {
      const participantsArray = JSON.parse(participants);
      if (participantsArray.includes(Number(userId))) {
        console.log('User is in the event');
      } else {
        this.router.navigate(['my-board']);
        console.log('User is not in the event');
      }
    }
  }
  
  getEventDetails() {
    this.route.paramMap.subscribe(params => {
      const eventId = params.get('id');
      console.log('ID de l\'événement récupéré :', eventId);

      if (eventId) {
        this.getEventService.getEvent(+eventId).subscribe({
          next: (data) => {
            this.eventDetails = data.event;
            console.log('Détails de l\'événement pour la pageb HTML :', this.eventDetails);
          },
          error: (err) => {
            console.error('Erreur lors de la récupération des détails de l\'événement :', err);
          }
        });
      }
    });
  }

  deleteEvent() {
    const eventId = this.eventDetails.id;
    console.log('ID de l\'événement à supprimer :', eventId);

    if (eventId) {
      this.getEventService.deleteEvent(eventId).subscribe({
        next: (data) => {
          console.log('Suppression de l\'événement réussie : ', data);
          this.deleteParticipationEvent()
          this.router.navigate(['my-board']);
        },
        error: (err) => {
          console.error('Erreur lors de la suppression de l\'événement :', err);
        }
      });
    }
  }
  
  deleteParticipationEvent() {
    const eventId = this.eventDetails.id;

    this.getEventService.deleteParticipationEvent(eventId).subscribe({
      next: (data) => {
        console.log('Suppression de la participation réussie : ', data);
      },
      error: (err) => {
        console.error('Erreur lors de la suppression de la participation :', err);
      }
    });
  }
  
  
}
