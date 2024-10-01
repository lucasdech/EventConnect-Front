import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ConnectedUserComponent } from './pages/connected-user/connected-user.component';
import { NotFoundComponent } from './components/not-found-component/not-found-component.component';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'contact', component: ContactComponent},
  { path: 'about-us', component: AboutUsComponent},
  { path: 'My-Board', component: ConnectedUserComponent},
  { path: '**', component: NotFoundComponent}
];
