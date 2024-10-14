import { Component, inject, OnInit, signal } from '@angular/core';
import { ParticipantsService } from '../../../services/EventUser/participants.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from '../../search-bar/search-bar.component';

@Component({
  selector: 'app-participants',
  standalone: true,
  imports: [CommonModule, SearchBarComponent],
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.css'],
})
export class ParticipantsComponent implements OnInit {
  private participantsService = inject(ParticipantsService);
  private route = inject(ActivatedRoute);
  public participants = signal<any[]>([]);
  public EventId: number = 0;
  public participantId: number = 0;
  public users: any[] = [];

  ngOnInit() {
    this.getAllUsers();
    this.setupToggleForms()
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
        console.log('Participants récupérés :', this.participants);
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des participants :', err);
      },
    });
  }

  deleteParticipant(participantId: number) {
    this.participantsService.deleteParticipant(participantId).subscribe({
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
    this.participantsService.userList().subscribe({
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
}
