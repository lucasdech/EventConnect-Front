import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule], // Ajout de ReactiveFormsModule ici
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent {
  registerForm: FormGroup;
  passwordMismatch: boolean = false;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      pseudo: ['', Validators.required],
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
      // Soumission du formulaire
      console.log('Form Submitted', this.registerForm.value);
    }
  }
}
