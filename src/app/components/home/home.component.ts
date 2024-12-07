import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Person } from '../../models/person.model';
import { PeopleService } from '../../services/people.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container mx-auto p-4">
      <h1 class="text-3xl font-bold mb-6">Welcome to People Management</h1>
      
      <div *ngIf="person" class="bg-white rounded-lg shadow p-6 mb-6">
        <h2 class="text-xl font-semibold mb-4">Featured Person</h2>
        <div class="space-y-2">
          <p><strong>Name:</strong> {{person.firstName}} {{person.lastName}}</p>
          <p><strong>Email:</strong> {{person.email}}</p>
          <p><strong>Age:</strong> {{person.age}}</p>
        </div>
      </div>

      <a routerLink="/people" 
         class="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
        View All People
      </a>
    </div>
  `,
})
export class HomeComponent implements OnInit {
  person?: Person;

  constructor(private peopleService: PeopleService) {}

  ngOnInit() {
    this.peopleService.getPeople().subscribe(people => {
      if (people.length > 0) {
        this.person = people[0];
      }
    });
  }
}