import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetEventService } from '../../services/Event/get-event.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ChatComponent } from '../../components/event-details/chat/chat.component';
import { ParticipantsComponent } from '../../components/event-details/participants/participants.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MyEventsService } from '../../services/EventUser/my-events.service';
import { CreateEventService, Credentials } from '../../services/EventUser/create-event.service';
import { EventFormComponent } from '../../components/event-form/event-form.component';
import { Observable } from 'rxjs';
import { Form, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ChatComponent,
    ParticipantsComponent,
    EventFormComponent,
    EventFormComponent,
    ReactiveFormsModule,
  ],
  providers: [MyEventsService],
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css'],
})
export class EventDetailsComponent implements OnInit {

  eventDetails: any;
  UserId = +(localStorage.getItem('ID') || 0);
  EventLocation = '';
  mapUrl: SafeResourceUrl | undefined;
  updateEventForm: FormGroup;
  isUpdateFormVisible = false;

  constructor(
    private getEventService: GetEventService,
    private createEventService: CreateEventService,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
    private fb: FormBuilder
  ) {
    this.updateEventForm = this.fb.group({
      title: [''],
      location: [''],
      description: [''],
      starting_at: [''],
      is_private: [''],
      password: ['']
    });
  }

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
    this.route.paramMap.subscribe((params) => {
      const eventId = params.get('id');
      console.log("ID de l'événement récupéré :", eventId);

      if (eventId) {
        this.getEventService.getEvent(+eventId).subscribe({
          next: (data) => {
            this.eventDetails = data.event;
            this.setEventLocation(this.eventDetails.location);
            console.log(
              "Détails de l'événement pour la page HTML :",
              this.eventDetails
            );
          },
          error: (err) => {
            console.error(
              "Erreur lors de la récupération des détails de l'événement :",
              err
            );
          },
        });
      }
    });
  }

  deleteEvent() {
    const eventId = this.eventDetails.id;
    console.log("ID de l'événement à supprimer :", eventId);

    if (eventId) {
      this.getEventService.deleteEvent(eventId).subscribe({
        next: (data) => {
          console.log("Suppression de l'événement réussie : ", data);
          this.deleteParticipationEvent();
          this.router.navigate(['my-board']);
        },
        error: (err) => {
          console.error("Erreur lors de la suppression de l'événement :", err);
        },
      });
    }
  }

  updateEvent() {
    if (this.updateEventForm.invalid) { return; }
    
    const eventId = this.eventDetails.id;
    const updatedEventData = this.updateEventForm.value;
    this.isUpdateFormVisible = !this.isUpdateFormVisible;
  
    this.createEventService.UpdateEvent(eventId, updatedEventData).subscribe({
      next: (data) => {
        console.log("Mise à jour de l'événement réussie : ", data);
        this.eventDetails = { ...this.eventDetails, ...updatedEventData };
      },
      error: (err) => {
        console.error("Erreur lors de la mise à jour de l'événement :", err);
      },
    });
  }

  deleteParticipationEvent() {
    const eventId = this.eventDetails.id;

    this.getEventService.deleteParticipationEvent(eventId).subscribe({
      next: (data) => {
        console.log('Suppression de la participation réussie : ', data);
      },
      error: (err) => {
        console.error(
          'Erreur lors de la suppression de la participation :',
          err
        );
      },
    });
  }

  deleteMyParticipation(event_id: number) {
    const userId = localStorage.getItem('ID');
    this.getEventService.deleteParticipationEvent(event_id).subscribe({
      next: (data: any) => {
        console.log('Suppression de la participation réussie : ', data);
        this.router.navigate(['my-board']);
      },
      error: (err: any) => {
        console.error(
          'Erreur lors de la suppression de la participation :',
          err
        );
      },
    });
  }

  setEventLocation(location: string) {
    this.EventLocation = location;
    const url = `https://www.google.com/maps/embed/v1/place?q=${encodeURIComponent(
      this.EventLocation
    )}&key=AIzaSyDA-wAzfEDLcn_9AmpmqR6pdjcYWLlEJW8`;
    this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
