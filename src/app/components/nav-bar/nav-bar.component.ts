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

  isBurgerMenuOpen = false;


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

  toggleBurgerMenu() {
    this.isBurgerMenuOpen = !this.isBurgerMenuOpen;
    const burgerMenu = document.getElementById('BurgerMenu');
    if (burgerMenu) {
      burgerMenu.classList.toggle('hidden', !this.isBurgerMenuOpen);
      burgerMenu.classList.toggle('flex', this.isBurgerMenuOpen);
      burgerMenu.classList.toggle('show', this.isBurgerMenuOpen);
    }
  }
}
