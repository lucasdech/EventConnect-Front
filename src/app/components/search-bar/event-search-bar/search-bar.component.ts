import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { GetEventService } from '../../../services/Event/get-event.service';
import { CommonModule } from '@angular/common';
import { ParticipantsService } from '../../../services/EventUser/participants.service';
import { EventSearchBarService } from '../../../services/SearchBar/event-search-bar.service';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent implements OnInit {

  public EventArray: any[] = [];
  searchForm: FormGroup;
  PassWordForm: FormGroup;
  isModalOpen = false;
  private userId: number = +(localStorage.getItem('ID') || 0);
  EventSearchBarService = inject(EventSearchBarService);

  constructor(private fb: FormBuilder, private pfb: FormBuilder, private getEventService: GetEventService, private participantsService: ParticipantsService) {
    this.searchForm = this.fb.group({
      title: [''],
    });
    this.PassWordForm = this.pfb.group({
      password: ['']
    });
  }

  ngOnInit(): void {
    this.onModalClick();
  }

  search() {
    let search = this.searchForm.value.title || '';

    this.getEventService.getAllEvents(search).subscribe({
      next: (result: any) => {
        this.EventArray = result.events.map((event: any) => ({
          ...event,
          showPasswordForm: false
        }));
        this.openModal();
      },
      error: (err) => {
        console.error('Erreur lors de la recherche :', err);
      },
    });
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  onModalClick() {
    let modal = document.querySelector('#modal');

    if (modal) {
      document.addEventListener('click', (event) => {
        if (this.isModalOpen == true && event.target == modal) {
          this.closeModal();
        }
      });
    }
  }

  participate(eventId: number, isprivate: boolean) {
    const event = this.EventArray.find(e => e.id === eventId);

    if (isprivate) {
      event.showPasswordForm = !event.showPasswordForm;
    } else {
      this.participantsService.addParticipant(this.userId, eventId).subscribe({
        next: (result: any) => {
          console.log('Participant ajouté avec succès :', result);
          window.location.reload();
        },
        error: (err: any) => {
          console.error("Erreur lors de l'ajout du participant :", err);
        },
      });
    }
  }

  submitPassword(event: any) {
    const password = this.PassWordForm.value.password;

   this.EventSearchBarService.verifiedPassWord(event.id, password).subscribe({
      next: (result: any) => {
        if (result.status) {
          this.participantsService.addParticipant(this.userId, event.id).subscribe({
            next: (result: any) => {
              console.log('Participant ajouté avec succès :', result);
              window.location.reload();
            },
            error: (err: any) => {
              console.error("Erreur lors de l'ajout du participant :", err);
            },
          });
        } else {
          console.log('Mot de passe incorrect');
        }
      }
    });

    console.log('Mot de passe soumis pour l\'événement ' + event.id + ':', password);
  }

}
