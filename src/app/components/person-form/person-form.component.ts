import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PeopleService } from '../../services/people.service';

@Component({
  selector: 'app-person-form',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  template: `
    <div class="container mx-auto p-4">
      <h1 class="text-3xl font-bold mb-6">{{isEditing ? 'Edit' : 'Create'}} Person</h1>

      <form [formGroup]="personForm" (ngSubmit)="onSubmit()" class="max-w-lg">
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">First Name</label>
            <input type="text" 
                   formControlName="firstName"
                   class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
            <div *ngIf="personForm.get('firstName')?.errors?.['required'] && personForm.get('firstName')?.touched"
                 class="text-red-600 text-sm mt-1">
              First name is required
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Last Name</label>
            <input type="text" 
                   formControlName="lastName"
                   class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
            <div *ngIf="personForm.get('lastName')?.errors?.['required'] && personForm.get('lastName')?.touched"
                 class="text-red-600 text-sm mt-1">
              Last name is required
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" 
                   formControlName="email"
                   class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
            <div *ngIf="personForm.get('email')?.errors?.['required'] && personForm.get('email')?.touched"
                 class="text-red-600 text-sm mt-1">
              Email is required
            </div>
            <div *ngIf="personForm.get('email')?.errors?.['email'] && personForm.get('email')?.touched"
                 class="text-red-600 text-sm mt-1">
              Please enter a valid email
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Age</label>
            <input type="number" 
                   formControlName="age"
                   class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
            <div *ngIf="personForm.get('age')?.errors?.['required'] && personForm.get('age')?.touched"
                 class="text-red-600 text-sm mt-1">
              Age is required
            </div>
            <div *ngIf="personForm.get('age')?.errors?.['min'] && personForm.get('age')?.touched"
                 class="text-red-600 text-sm mt-1">
              Age must be at least 0
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Phone</label>
            <input type="tel" 
                   formControlName="phone"
                   class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
          </div>

          <div class="flex space-x-4">
            <button type="submit"
                    [disabled]="!personForm.valid"
                    class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50">
              Save
            </button>
            <button type="button"
                    (click)="onCancel()"
                    class="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors">
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  `
})
export class PersonFormComponent implements OnInit {
  personForm: FormGroup;
  isEditing = false;
  personId?: number;

  constructor(
    private fb: FormBuilder,
    private peopleService: PeopleService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.personForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      age: ['', [Validators.required, Validators.min(0)]],
      phone: ['']
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEditing = true;
      this.personId = Number(id);
      const person = this.peopleService.getPerson(this.personId);
      if (person) {
        this.personForm.patchValue(person);
      }
    }
  }

  onSubmit() {
    if (this.personForm.valid) {
      if (this.isEditing && this.personId) {
        this.peopleService.updatePerson(this.personId, this.personForm.value);
      } else {
        this.peopleService.addPerson(this.personForm.value);
      }
      this.router.navigate(['/people']);
    }
  }

  onCancel() {
    this.router.navigate(['/people']);
  }
}