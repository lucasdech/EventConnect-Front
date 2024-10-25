import { Component } from '@angular/core';
import emailjs from '@emailjs/browser';


@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {

  sendContactMail(e: Event) {
    e.preventDefault();
    
    emailjs.sendForm('service_zney9zb', 'template_3fqpmsc', e.target as HTMLFormElement, 'axGHXJxZTzNmxwZFq')
      .then((result) => {
        console.log(result.text);
        alert('Email envoyé avec succès !');
      }, (error) => {
        console.log(error.text);
        alert('Erreur lors de l\'envoi de l\'email.');
      });
  }
  
}
