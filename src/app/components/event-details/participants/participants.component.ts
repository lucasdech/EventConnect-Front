import { Component, inject, OnInit, signal, Input } from '@angular/core';
import { ParticipantsService } from '../../../services/EventUser/participants.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserSearchBarComponent } from '../../search-bar/user-search-bar/user-search-bar.component';


@Component({
  selector: 'app-participants',
  standalone: true,
  imports: [CommonModule, UserSearchBarComponent],
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.css'],
})
export class ParticipantsComponent implements OnInit {

  @Input() event: any;

  private participantsService = inject(ParticipantsService);
  private route = inject(ActivatedRoute);
  public participants = signal<any[]>([]);
  public EventId: number = 0;
  public participantId: number = 0;
  public users: any[] = [];
  public ParticipantsArray: any[] = [];
  public UserId: number = +(localStorage.getItem('ID') || 0);

  ngOnInit() {
    console.log('ICI LEVENT', this.event)
    this.getAllUsers();
    this.setupToggleForms()
    localStorage.setItem('Participants', JSON.stringify([]));
    this.route.paramMap.subscribe((params) => {
      this.EventId = +params.get('id')!;
      console.log("ID de l'événement récupéré :", this.EventId);
      const participantIdStr = localStorage.getItem('ID');
      this.participantId = participantIdStr ? +participantIdStr : 0;
      this.getParticipants();
    });
  }

  setupToggleForms() {
    const AddParticipantBtn = document.querySelector('#AddParticipantBtn');
    const UserList = document.querySelector('#userList');

    if (AddParticipantBtn && UserList) {
      AddParticipantBtn.addEventListener('click', (event) => {
        event.stopPropagation();
        UserList.classList.toggle('hidden');
      });

      document.addEventListener('click', (event) => {
        if (!UserList.classList.contains('hidden') && !UserList.contains(event.target as Node)) {
          UserList.classList.add('hidden');
        }
      });

      UserList.addEventListener('click', (event) => {
        event.stopPropagation();
      });
    }
  }

  getParticipants() {
    this.participantsService.getUsersInEvent(this.EventId).subscribe({
      next: (data) => {
        this.participants.set(data);

        this.participants().forEach((participant) => {
          this.ParticipantsArray.push(participant.id);
        })
        localStorage.setItem('Participants', JSON.stringify(this.ParticipantsArray));
        
        console.log('Participants récupérés :', this.participants);
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des participants :', err);
      },
    });
  }

  deleteParticipant(participantId: number, eventId: number) {
    eventId = this.EventId;
    this.participantsService.deleteParticipant(participantId, eventId).subscribe({
      next: (data) => {
        console.log('Participant supprimé :', data);
        this.participants.set(this.participants().filter(
          (participant) => participant.id !== participantId
        ));
      },
      error: (err) => {
        console.error('Erreur lors de la suppression du participant :', err);
      },
    });
  }

  getAllUsers() {
    this.participantsService.userList('').subscribe({
      next: (data) => {
        this.users = data.data.users;
        console.log('liste de users : ', data);
      },
      error: (err) => {
        console.log('erreur lors de la recuperation des users :', err);
      },
    });
  }

  addParticipants(userId: number) {

    this.participantsService.addParticipant(userId, this.EventId).subscribe({
      next: (result) => {
        console.log('Participant ajouté avec succès :', result);
        this.getParticipants();
      },
      error: (err) => {
        console.error('Erreur lors de l\'ajout du participant :', err);
      }
    });
  }

  isUserInEvent(userId: number) {
    if (this.ParticipantsArray.includes(userId)) {
      return true;
    }
    return false;
  }

  upScroll() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}
