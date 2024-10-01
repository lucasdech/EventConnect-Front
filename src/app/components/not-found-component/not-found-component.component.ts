import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  standalone: true,
  template: `
    <div class="not-found-container">
      <h1>404 - Page non trouvée</h1>
      <p>La page que vous recherchez n'existe pas.</p>
      <a routerLink="/" class="btn">Retour à l'accueil</a>
    </div>
  `,
  styles: [`
    .not-found-container {
      text-align: center;
      margin-top: 50px;
    }
    .btn {
      margin-top: 20px;
      background-color: #007bff;
      color: white;
      padding: 10px 20px;
      border-radius: 5px;
      text-decoration: none;
    }
  `]
})
export class NotFoundComponent { }
