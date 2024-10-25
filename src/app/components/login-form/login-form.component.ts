import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; 
import { Credentials, LoginService } from '../../services/user/login.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent {

  private loginService = inject(LoginService);
  private route = inject(Router);
  public error = '';

  loginForm: FormGroup;
  invalidCredentials = false;

  constructor(private fb: FormBuilder) { 
    this.loginForm = this.fb.group({ 
      email: ['', Validators.required], 
      password: ['', Validators.required]
    });
  }

  login() {
    
    if (this.loginForm.invalid) return;

    this.loginService.login(this.loginForm.value as Credentials).subscribe({
      next: (success: boolean) => {
        if (success) {
          this.route.navigate(['my-board']);
        } else {
          this.invalidCredentials = true;
        }
      },
      error: (err) => {
        this.error = 'Mot de passe ou email incorrect';
        console.error('Erreur lors de la connexion :', err);
        this.invalidCredentials = true;
      }
    });
  }
}
