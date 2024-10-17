import { Component, inject } from '@angular/core';
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
export class SearchBarComponent {

  private getEventService = inject(GetEventService);
  public EventArray: any[] = [];
  searchForm: FormGroup;
  isModalOpen = false;

  constructor(private fb: FormBuilder) { 
    this.searchForm = this.fb.group({ 
      title: ['']
    });
  }

  search() {
    let search = this.searchForm.value.title || '';

    this.getEventService.getAllEvents(search)
      .subscribe({
        next: (result: any) => {
          this.EventArray = result.events;
          this.openModal();  // Afficher la modal après la recherche
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
}
