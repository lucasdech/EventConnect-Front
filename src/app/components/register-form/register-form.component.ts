import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Credentials, RegisterService } from '../../services/user/register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule], 
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent {

  private RegisterService = inject(RegisterService);
  private router = inject(Router);

  registerForm: FormGroup;
  invalidCredentials = false;

  passwordMismatch: boolean = false;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      custom_pp: [''],
      default_pp: [''],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  onSubmit() {
    const { password, confirmPassword } = this.registerForm.value;
    
    if (password !== confirmPassword) {
      this.passwordMismatch = true;
    } else {
      this.passwordMismatch = false;

      console.log('Form Submitted', this.registerForm.value);
    }
  }

  Register() {
    if (this.registerForm.invalid) return 

    this.RegisterService.register(this.registerForm.value as Credentials).subscribe({
      next: (success: boolean) => {
        if (success) {
          this.router.navigate(['my-board']);
        } else {
          this.invalidCredentials = true;
        }
      },error: (err) => {
        console.error("Erreur lors de l\'enregistrement :", err);
        this.invalidCredentials = true;
      }
    })

  }
}
