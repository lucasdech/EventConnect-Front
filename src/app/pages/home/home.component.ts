import { Component, OnInit } from '@angular/core';
import { RegisterFormComponent } from '../../components/register-form/register-form.component';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { NavToHomeService } from '../../services/nav-to-home.service';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [RegisterFormComponent, LoginFormComponent],
})
export class HomeComponent implements OnInit{

  constructor(private navToHomeService: NavToHomeService) { }

  ngOnInit(): void {

    this.navToHomeService.showRegisterForm$.subscribe(show => {
      console.log('showRegisterForm state changed:', show);
      if (show) {
        document.getElementById('registerForm')?.classList.remove('hidden');
      } else {
        document.getElementById('registerForm')?.classList.add('hidden');
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

  showRegisterForm() {
    this.navToHomeService.showRegister();
    const registerForm = document.querySelector('#registerForm');
    if (registerForm) {
      registerForm.scrollIntoView({ behavior: 'smooth' });
    }
  }

}
