import { Component, OnInit } from '@angular/core';  // Ajout de OnInit
import { LoginFormComponent } from '../../components/login-form/login-form.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [LoginFormComponent]
})
export class HomeComponent implements OnInit {

  ngOnInit() {  
    this.displayLogin(); 
  }

  displayLogin() {
    
    const loginBtn = document.querySelector('#loginBtn')
    const formLogin = document.querySelector('#loginForm')

    if (loginBtn && formLogin) {
      loginBtn.addEventListener('click', () => {
        formLogin.classList.toggle('hidden')
      })
    }
  }
}