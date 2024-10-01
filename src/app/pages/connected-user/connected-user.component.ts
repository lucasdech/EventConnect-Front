import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MyEventsService } from '../../services/EventUser/my-events.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-connected-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './connected-user.component.html',
  styleUrls: ['./connected-user.component.css']
})
export class ConnectedUserComponent implements OnInit {
  events$: Observable<any[]> = of([]); // Initialisation à un tableau vide

  constructor(private myEventsService: MyEventsService) {}

  ngOnInit() {
    this.events$ = this.myEventsService.getUserEvents();
  }
}
