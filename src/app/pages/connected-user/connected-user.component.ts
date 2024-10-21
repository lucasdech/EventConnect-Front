import { Component, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MyEventsService } from '../../services/EventUser/my-events.service';
import { CommonModule } from '@angular/common';
import { EventFormComponent } from '../../components/event-form/event-form.component';
import { SearchBarComponent } from '../../components/search-bar/event-search-bar/search-bar.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-connected-user',
  standalone: true,
  imports: [CommonModule, EventFormComponent, SearchBarComponent],
  templateUrl: './connected-user.component.html',
  styleUrls: ['./connected-user.component.css']
})
export class ConnectedUserComponent implements OnInit {
  
  events$: Observable<any[]> = of([]);

  constructor(private myEventsService: MyEventsService, private router: Router) {}
  
  ngOnInit() {
    this.isConnectedUser();
    this.events$ = this.myEventsService.getUserEvents();
    // this.myEventsService.getUserEvents();
    this.setupToggleForms();
  }

  navigateToEvent(eventId: number) {
    this.router.navigate(['/event', eventId]);
  }

  isConnectedUser() {
    if (!localStorage.getItem('JWT')) {
      this.router.navigate(['/']);
    }
  }

  setupToggleForms() {
    const EventBtn = document.querySelector('#event-form-btn');
    const formEvent = document.querySelector('#event-form');
    
    if (EventBtn && formEvent) {
      EventBtn.addEventListener('click', () => {
        formEvent.classList.toggle('hidden')
      });
    }
  }

}
