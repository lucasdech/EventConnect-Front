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
export class HomeComponent implements OnInit {

  constructor(private navToHomeService: NavToHomeService) { }

  ngOnInit() {
    this.setupToggleForms();
  }

  setupToggleForms() {
    const registerBtn = document.querySelector('#registerBtn');
    const registerForm = document.querySelector('#registerForm');

    if (registerBtn && registerForm) {

    }
  }

  showLoginForm() {
    this.navToHomeService.showLogin();
  }

}
