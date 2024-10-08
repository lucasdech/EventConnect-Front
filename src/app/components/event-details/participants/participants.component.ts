import { Component, inject, OnInit } from '@angular/core';
import { ParticipantsService } from '../../../services/EventUser/participants.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-participants',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.css']
})
export class ParticipantsComponent implements OnInit {

  private participantsService = inject(ParticipantsService);
  private route = inject(ActivatedRoute);
  public participants: any[] = [];
  public EventId: number = 0;
  public participantId: number = 0; 

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.EventId = +params.get('id')!;
      console.log('ID de l\'événement récupéré :', this.EventId);
      const participantIdStr = localStorage.getItem('ID');
      this.participantId = participantIdStr ? +participantIdStr : 0;
      this.getParticipants(); 
    });
  }

  getParticipants() {
    this.participantsService.getUsersInEvent(this.EventId).subscribe({
      next: (data) => {
        this.participants = data;
        console.log('Participants récupérés :', this.participants);
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des participants :', err);
      }
    });
  }

  deleteParticipant(participantId: number) {
    this.participantsService.deleteParticipant(participantId).subscribe({
      next: (data) => {
        console.log('Participant supprimé :', data);
        this.participants = this.participants.filter(participant => participant.id !== participantId);
      },
      error: (err) => {
        console.error('Erreur lors de la suppression du participant :', err);
      }
    });
  }
}
