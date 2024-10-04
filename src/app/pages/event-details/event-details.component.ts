import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetEventService } from '../../services/Event/get-event.service';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {

  eventDetails: any;

  constructor(private getEventService: GetEventService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.getEventDetails();
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
