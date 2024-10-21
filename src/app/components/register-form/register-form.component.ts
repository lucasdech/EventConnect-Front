import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Credentials, RegisterService } from '../../services/user/register.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule], 
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  private RegisterService = inject(RegisterService);
  private router = inject(Router);

  public BtnContent = '';

  registerForm: FormGroup;
  invalidCredentials = false;
  passwordMismatch: boolean = false;

  @Input() user:any = [];


  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      profile_picture: [null, Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Utilisation de this.router.url pour obtenir la route actuelle
    const currentRoute = this.router.url;
    console.log("Route actuelle :", currentRoute);

    this.BtnContent = currentRoute === '/' ? 'S\'inscrire' : 'Modifier';
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    this.registerForm.patchValue({
      profile_picture: file
    });
  }

  onSubmit() {
    const { password, confirmPassword } = this.registerForm.value;

    if (password !== confirmPassword) {
      this.passwordMismatch = true;
      return;
    }

    this.passwordMismatch = false;

    if (this.router.url === '/') {
      this.Register();
    } else {
      this.UpdateProfile();
    }
  }

  Register() {
    if (this.registerForm.invalid) return;

    console.log('Inscription en cours...', this.registerForm.value);

    this.RegisterService.register(this.registerForm.value as Credentials).subscribe({
      next: (success: boolean) => {
        if (success) {
          this.router.navigate(['my-board']);
        } else {
          this.invalidCredentials = true;
        }
      },
      error: (err) => {
        console.error("Erreur lors de l'enregistrement :", err);
        this.invalidCredentials = true;
      }
    });
  }

  UpdateProfile() {
    this.RegisterService.updateProfile(this.registerForm.value as Credentials).subscribe({
      next: (success: boolean) => {
        if (success) {
          this.router.navigate(['my-account']);
        } else {
          this.invalidCredentials = true;
        }
      },
      error: (err: any) => {
        console.error("Erreur lors de la mise à jour du profil :", err);
        this.invalidCredentials = true;
      }
    });
  }
}
