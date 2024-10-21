import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { inject } from '@angular/core';
import { GetMyAccountService } from '../../services/user/get-my-account.service';
import { RegisterFormComponent } from "../../components/register-form/register-form.component";

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule, RegisterFormComponent, RegisterFormComponent],
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  myAccountService = inject(GetMyAccountService);
  user: any;

  constructor( ) { }

  ngOnInit(): void {
    this.getMyAccount();
  }

  openForm() {
    const form = document.querySelector('#updateForm');
    if (form) {
      form.classList.toggle('hidden');
    }
  }

  getMyAccount() {
    this.myAccountService.getMyAccount().subscribe((result: any) => {
      if (result) {
        this.user = result.user;
      } else {
        console.error('Aucun compte récupéré');
      }
    }
  )}

}
