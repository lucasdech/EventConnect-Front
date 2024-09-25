import { Component, OnInit } from '@angular/core';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { RegisterFormComponent } from '../../components/register-form/register-form.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [LoginFormComponent, RegisterFormComponent]
})
export class HomeComponent implements OnInit {

  ngOnInit() {  
    this.setupToggleForms();
  }

  setupToggleForms() {
    const loginBtn = document.querySelector('#loginBtn');
    const formLogin = document.querySelector('#loginForm');
    const registerBtn = document.querySelector('#registerBtn');
    const registerForm = document.querySelector('#registerForm');

    if (loginBtn && formLogin && registerBtn && registerForm) {
      loginBtn.addEventListener('click', () => {
        // Fermer le formulaire d'inscription s'il est ouvert
        if (!registerForm.classList.contains('hidden')) {
          registerForm.classList.add('hidden');
        }
        // Ouvrir/fermer le formulaire de connexion
        formLogin.classList.toggle('hidden');
      });

      registerBtn.addEventListener('click', () => {
        // Fermer le formulaire de connexion s'il est ouvert
        if (!formLogin.classList.contains('hidden')) {
          formLogin.classList.add('hidden');
        }
        // Ouvrir/fermer le formulaire d'inscription
        registerForm.classList.toggle('hidden');
      });
    }
  }
}
