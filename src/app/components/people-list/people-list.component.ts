import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Person } from '../../models/person.model';
import { PeopleService } from '../../services/people.service';

@Component({
  selector: 'app-people-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="container mx-auto p-4">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold">People List</h1>
        <a routerLink="/people/new" 
           class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
          Create New Person
        </a>
      </div>

      <div class="mb-4">
        <input type="text"
               [(ngModel)]="searchTerm"
               (input)="filterPeople()"
               placeholder="Search people..."
               class="w-full px-4 py-2 border rounded-lg">
      </div>

      <div class="bg-white rounded-lg shadow overflow-hidden">
        <table class="min-w-full">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  (click)="sort('firstName')">Name</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  (click)="sort('email')">Email</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  (click)="sort('age')">Age</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr *ngFor="let person of filteredPeople">
              <td class="px-6 py-4">{{person.firstName}} {{person.lastName}}</td>
              <td class="px-6 py-4">{{person.email}}</td>
              <td class="px-6 py-4">{{person.age}}</td>
              <td class="px-6 py-4 space-x-2">
                <a [routerLink]="['/people', person.id, 'edit']" 
                   class="text-indigo-600 hover:text-indigo-900">Edit</a>
                <button (click)="deletePerson(person.id)"
                        class="text-red-600 hover:text-red-900">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class PeopleListComponent implements OnInit {
  people: Person[] = [];
  filteredPeople: Person[] = [];
  searchTerm = '';
  sortField = 'firstName';
  sortDirection = 1;

  constructor(private peopleService: PeopleService) {}

  ngOnInit() {
    this.peopleService.getPeople().subscribe(people => {
      this.people = people;
      this.filterPeople();
    });
  }

  filterPeople() {
    this.filteredPeople = this.people.filter(person =>
      Object.values(person).some(value =>
        value.toString().toLowerCase().includes(this.searchTerm.toLowerCase())
      )
    );
    this.sort(this.sortField);
  }

  sort(field: string) {
    this.sortDirection = this.sortField === field ? -this.sortDirection : 1;
    this.sortField = field;
    
    this.filteredPeople.sort((a: any, b: any) => {
      if (a[field] < b[field]) return -this.sortDirection;
      if (a[field] > b[field]) return this.sortDirection;
      return 0;
    });
  }

  deletePerson(id: number) {
    if (confirm('Are you sure you want to delete this person?')) {
      this.peopleService.deletePerson(id);
    }
  }
}