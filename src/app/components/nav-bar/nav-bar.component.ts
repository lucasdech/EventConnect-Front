import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  userId: number = 0;
  public isConnected = signal<boolean>(false);
  

  constructor() {}

  ngOnInit() {
    this.IsconnectedUser();
  }

  logout() {
    localStorage.removeItem('ID');
    localStorage.removeItem('Participants');
    localStorage.removeItem('JWT');
    localStorage.removeItem('MyEvents');
    window.location.href = '/';
  }

  IsconnectedUser() {
    if (typeof localStorage.getItem('ID') !== 'undefined' && localStorage.getItem('ID') !== null) {
      this.isConnected.set(true);
    } else {
      this.isConnected.set(false);
    }
  }

  login() {
    window.location.href = '/login';
  }
}
