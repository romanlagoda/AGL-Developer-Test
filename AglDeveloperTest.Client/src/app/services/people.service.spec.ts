import { TestBed, inject } from '@angular/core/testing';
import { PeopleService } from './people.service';
import { Http, Response, ResponseOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { Person } from '../models/person'
import { PetsByPersonGender } from '../models/pets-by-person-gender'

declare var jasmine: any;

describe('PeopleService', () => {
  let httpMock: any;

  beforeEach(() => {
    httpMock = jasmine.createSpyObj('HttpMock', ['get']);

    TestBed.configureTestingModule({
      providers: [
        PeopleService,
        { provide: Http, useValue: httpMock }
      ]
    });
  });

  it('should be created', inject([PeopleService], (service: PeopleService) => {
    expect(service).toBeTruthy();
  }));

  it('getPetsByPersonGender should request and return data', inject([PeopleService], (service: PeopleService) => {
    httpMock.get.and.returnValue(Observable.of(new Response(
      new ResponseOptions({
        status: 200,
        body: JSON.stringify([
          { name: 'name-1', gender: 'gender-1', pets: [{ name: 'pet-name-3', type: 'Cat' }, { name: 'pet-name-2', type: 'Dog' }] },
          { name: 'name-2', gender: 'gender-1', pets: [{ name: 'pet-name-1', type: 'Cat' }] },
          { name: 'name-3', gender: 'gender-2', pets: [{ name: 'pet-name-4', type: 'Cat' }, { name: 'pet-name-5', type: 'Fish' }] },
          { name: 'name-4', gender: 'gender-2', pets: null }
        ])
      })
    )));

    service.getPetsByPersonGender().subscribe((data: PetsByPersonGender[]) => {
      expect(data.length).toBe(2);
      expect(data[0].gender).toBe('gender-1');
      expect(data[0].pets.length).toBe(2);
      expect(data[0].pets[0].name).toBe('pet-name-1');
      expect(data[0].pets[1].name).toBe('pet-name-3');
      expect(data[1].gender).toBe('gender-2');
      expect(data[1].pets.length).toBe(1);
    });
  }));
});