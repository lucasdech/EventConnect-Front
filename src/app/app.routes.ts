import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ConnectedUserComponent } from './pages/connected-user/connected-user.component';
import { EventDetailsComponent } from './pages/event-details/event-details.component';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'my-board', component: ConnectedUserComponent },
  { path: 'event/:id', component: EventDetailsComponent }
];
