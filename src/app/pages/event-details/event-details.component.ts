import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetEventService } from '../../services/Event/get-event.service';
import { ParticipantsService } from '../../services/EventUser/participants.service';

import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';
import { ChatComponent } from '../../components/event-details/chat/chat.component';
import { ParticipantsComponent } from '../../components/event-details/participants/participants.component';
import { Router } from '@angular/router';
import { inject, Injectable } from '@angular/core';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [CommonModule, RouterModule, ChatComponent, ParticipantsComponent, ],
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {

  eventDetails: any;

  constructor(private getEventService: GetEventService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.isConnectedUser();
    this.getEventDetails();
    setTimeout(() => {
      this.isUserInEvent();
    }, 500);
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
}


