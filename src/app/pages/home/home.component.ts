import { Component, OnInit } from '@angular/core';
import { RegisterFormComponent } from '../../components/register-form/register-form.component';
import { LoginFormComponent } from '../../components/login-form/login-form.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [RegisterFormComponent, LoginFormComponent]
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
        
        if (!registerForm.classList.contains('hidden')) {
          registerForm.classList.add('hidden');
        }
        
        formLogin.classList.toggle('hidden');
      });

      registerBtn.addEventListener('click', () => {
        
        if (!formLogin.classList.contains('hidden')) {
          formLogin.classList.add('hidden');
        }
      
        registerForm.classList.toggle('hidden');
      });
    }
  }
}
