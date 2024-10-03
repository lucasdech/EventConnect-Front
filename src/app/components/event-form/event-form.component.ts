import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateEventService, Credentials } from '../../services/EventUser/create-event.service';

@Component({
  selector: 'app-event-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent {
  private eventService = inject(CreateEventService);
  
  eventForm: FormGroup;
  invalidCredentials = false;

  constructor(private fb: FormBuilder) {
    this.eventForm = this.fb.group({
      user_id: [localStorage.getItem('ID'), Validators.required],
      location: ['', Validators.required],
      description: ['', Validators.required],
      title: ['', Validators.required],
      starting_at: ['', Validators.required],
      is_private: [false],
      password: ['', Validators.required]
    });
  }

  createForm() {
    if (this.eventForm.invalid) return;

    this.eventService.createEvent(this.eventForm.value as Credentials).subscribe({
      next: (eventId: number) => { // Attendez maintenant un nombre
        console.log('Événement créé avec succès, ID:', eventId);
        
        this.eventService.participateInEvent(eventId).subscribe({
          next: (participationResult) => {
            console.log('Participation réussie:', participationResult);
          },
          error: (err) => {
            console.error('Erreur lors de la participation à l\'événement:', err);
          }
        });
      },
      error: (err) => {
        console.error('Erreur lors de la création de l\'événement :', err);
        this.invalidCredentials = true;
      }
    });
  }
}
