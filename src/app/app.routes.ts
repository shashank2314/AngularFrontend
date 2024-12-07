import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PeopleListComponent } from './components/people-list/people-list.component';
import { PersonFormComponent } from './components/person-form/person-form.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'people', component: PeopleListComponent },
  { path: 'people/new', component: PersonFormComponent },
  { path: 'people/:id/edit', component: PersonFormComponent },
  { path: '**', redirectTo: '' }
];