import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit {

  userId: number = 0;
  isConnected: boolean = false;

  constructor() {}

  ngOnInit() {
    this.IsconnectedUser();
  }

  logout() {
    localStorage.removeItem('ID');
    localStorage.removeItem('Participants');
    localStorage.removeItem('JWT');
    window.location.href = '/';
  }

  IsconnectedUser() {
    if (typeof localStorage.getItem('ID') != undefined && localStorage.getItem('ID') != null) {
      this.isConnected = true;
    }else {
      this.isConnected = false;
    }
  }

}
