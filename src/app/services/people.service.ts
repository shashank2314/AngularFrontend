import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Person } from '../models/person.model';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  private people: Person[] = [];
  private peopleSubject = new BehaviorSubject<Person[]>([]);

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage(): void {
    const stored = localStorage.getItem('people');
    if (stored) {
      this.people = JSON.parse(stored);
      this.peopleSubject.next(this.people);
    }
  }

  private saveToStorage(): void {
    localStorage.setItem('people', JSON.stringify(this.people));
  }

  getPeople(): Observable<Person[]> {
    return this.peopleSubject.asObservable();
  }

  getPerson(id: number): Person | undefined {
    return this.people.find(p => p.id === id);
  }

  addPerson(person: Omit<Person, 'id' | 'createdAt' | 'updatedAt'>): void {
    const newPerson: Person = {
      ...person,
      id: Date.now(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.people.push(newPerson);
    this.peopleSubject.next(this.people);
    this.saveToStorage();
  }

  updatePerson(id: number, person: Partial<Person>): void {
    const index = this.people.findIndex(p => p.id === id);
    if (index !== -1) {
      this.people[index] = {
        ...this.people[index],
        ...person,
        updatedAt: new Date()
      };
      this.peopleSubject.next(this.people);
      this.saveToStorage();
    }
  }

  deletePerson(id: number): void {
    this.people = this.people.filter(p => p.id !== id);
    this.peopleSubject.next(this.people);
    this.saveToStorage();
  }
}