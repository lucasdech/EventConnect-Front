import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { GetEventService } from '../../services/Event/get-event.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent implements OnInit {

  private getEventService = inject(GetEventService);
  public EventArray: any[] = [];
  searchForm: FormGroup;
  isModalOpen = false;

  constructor(private fb: FormBuilder) { 
    this.searchForm = this.fb.group({ 
      title: ['']
    });
  }

  ngOnInit(): void {
    this.onModalClick();
  }

  search() {
    let search = this.searchForm.value.title || '';

    this.getEventService.getAllEvents(search)
      .subscribe({
        next: (result: any) => {
          this.EventArray = result.events;
          this.openModal();
        },
        error: (err) => {
          console.error('Erreur lors de la recherche :', err);
        }
      });
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  onModalClick() {
    let modal = document.querySelector('#modal');

    if (modal) {
     
      document.addEventListener('click', (event) => {
        if (this.isModalOpen == true && event.target == modal) {
         this.closeModal();
        }
      });
    }
  }

}
