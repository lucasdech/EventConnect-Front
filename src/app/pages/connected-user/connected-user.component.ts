import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MyEventsService } from '../../services/EventUser/my-events.service';
import { CommonModule } from '@angular/common';
import { EventFormComponent } from '../../components/event-form/event-form.component';

@Component({
  selector: 'app-connected-user',
  standalone: true,
  imports: [CommonModule, EventFormComponent],
  templateUrl: './connected-user.component.html',
  styleUrls: ['./connected-user.component.css']
})
export class ConnectedUserComponent implements OnInit {
  
  events$: Observable<any[]> = of([]);

  constructor(private myEventsService: MyEventsService) {}

  ngOnInit() {
    this.events$ = this.myEventsService.getUserEvents();
  }
}
