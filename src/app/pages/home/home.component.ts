import { Component } from '@angular/core';
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
export class HomeComponent {

  constructor(private navToHomeService: NavToHomeService) { }


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
