import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginFormComponent } from '../../components/login-form/login-form.component';

// Définition du modèle User
export interface User {
  id: number;
  name: string;
  email: string;
  profile_picture: string;
  created_at: string;
  updated_at: string;
}

// Module User
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LoginFormComponent
  ],
  exports: [LoginFormComponent]
})
export class UserModule { }


