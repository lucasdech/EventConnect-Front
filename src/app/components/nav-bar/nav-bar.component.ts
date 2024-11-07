import { Component, inject, OnInit, signal } from '@angular/core';
import { NavToHomeService } from '../../services/nav-to-home.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  private navToHomeService = inject(NavToHomeService);

  isBurgerMenuOpen = false;
  userId: number = 0;
  public isConnected = signal<boolean>(false);

  constructor() {}

  ngOnInit() {
    this.IsconnectedUser();

    
    this.navToHomeService.showLoginForm$.subscribe(show => {
      console.log('showLoginForm state changed:', show);
      if (show) {
        document.getElementById('loginForm')?.classList.remove('hidden');
      } else {
        document.getElementById('loginForm')?.classList.add('hidden');
      }
    });
  }

  showLoginForm() {
    this.navToHomeService.showLogin();
    const loginForm = document.querySelector('#loginForm');
    if (loginForm) {
      loginForm.scrollIntoView({ behavior: 'smooth' });
    }
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
