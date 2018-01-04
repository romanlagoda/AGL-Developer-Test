import { TestBed, inject } from '@angular/core/testing';
import { PeopleService } from './people.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { Person } from '../models/person';
import { PetsByPersonGender } from '../models/pets-by-person-gender';

describe('PeopleService', () => {
  let mockHttpClient: any;

  beforeEach(() => {
    mockHttpClient = jasmine.createSpyObj('HttpClient', ['get']);

    TestBed.configureTestingModule({
      providers: [
        PeopleService,
        { provide: HttpClient, useValue: mockHttpClient }
      ]
    });
  });

  it('should be created', inject([PeopleService], (service: PeopleService) => {
    expect(service).toBeTruthy();
  }));

  it('getCatsByPersonGender should request data', inject([PeopleService], (service: PeopleService) => {
    mockHttpClient.get.and.returnValue(Observable.of([]));
    service.getCatsByPersonGender();
    expect(mockHttpClient.get).toHaveBeenCalled();
  }));

  it('getCatsByPersonGender should return cats', inject([PeopleService], (service: PeopleService) => {
    mockHttpClient.get.and.returnValue(Observable.of([{
      name: 'name-1', gender: 'gender-1', pets: [
        { name: 'pet-name-1', type: 'Cat' },
        { name: 'pet-name-2', type: 'Dog' },
        { name: 'pet-name-3', type: 'Fish' },
        null
      ]
    }]));
    service.getCatsByPersonGender().subscribe((data: PetsByPersonGender[]) => {
      expect(data[0].pets.length).toBe(1);
      expect(data[0].pets[0].type).toBe('Cat');
    });
  }));

  it('getCatsByPersonGender should return data groupped by person gender', inject([PeopleService], (service: PeopleService) => {
    mockHttpClient.get.and.returnValue(Observable.of([
      { name: 'name-1', gender: 'gender-1', pets: [{ name: 'pet-name-1', type: 'Cat' }] },
      { name: 'name-2', gender: 'gender-1', pets: [{ name: 'pet-name-2', type: 'Cat' }] },
      { name: 'name-3', gender: 'gender-2', pets: [{ name: 'pet-name-3', type: 'Cat' }] },
      { name: 'name-4', gender: 'gender-2', pets: null },
    ]));
    service.getCatsByPersonGender().subscribe((data: PetsByPersonGender[]) => {
      expect(data[0].gender).toBe('gender-1');
      expect(data[0].pets.length).toBe(2);
      expect(data[1].gender).toBe('gender-2');
      expect(data[1].pets.length).toBe(1);
    });
  }));

  it('getCatsByPersonGender should return sorted data', inject([PeopleService], (service: PeopleService) => {
    mockHttpClient.get.and.returnValue(Observable.of([{
      name: 'name-1', gender: 'gender-1', pets: [
        { name: 'pet-name-3', type: 'Cat' },
        { name: 'pet-name-2', type: 'Cat' },
        { name: 'pet-name-1', type: 'Cat' }
      ]
    }]));
    service.getCatsByPersonGender().subscribe((data: PetsByPersonGender[]) => {
      expect(data[0].pets[0].name).toBe('pet-name-1');
      expect(data[0].pets[1].name).toBe('pet-name-2');
      expect(data[0].pets[2].name).toBe('pet-name-3');
    });
  }));
});
