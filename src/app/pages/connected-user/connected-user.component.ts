import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { MyEventsService } from '../../services/EventUser/my-events.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-connected-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './connected-user.component.html',
  styleUrls: ['./connected-user.component.css']
})
export class ConnectedUserComponent {
  events$: Observable<any[]>;

  constructor(private myEventsService: MyEventsService) {
    this.events$ = this.myEventsService.getUserEvents();
  }
}