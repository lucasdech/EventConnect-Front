import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ParticipantsService } from '../../../services/EventUser/participants.service';
import { ParticipantsComponent } from '../../event-details/participants/participants.component';

@Component({
  selector: 'app-user-search-bar',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-search-bar.component.html',
  styleUrls: ['./user-search-bar.component.css'],
})
export class UserSearchBarComponent implements OnInit {

  public UserArray: any[] = [];
  searchForm: FormGroup;
  private participantsService = inject(ParticipantsService);
  private participantsComponent = inject(ParticipantsComponent);
  
  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      title: [''],
    });

  }

  ngOnInit(): void {
    
  }

  search() {

    let search = this.searchForm.value.title || '';

    this.participantsService.userList(search).subscribe({
      next: (data) => {
        this.participantsComponent.users = data.data.users;
        console.log('SEARCHBAR USER ', data.data);
      },
      error: (err) => {
        console.log('erreur lors de la recuperation des users :', err);
      },
    });
  }


}
