import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import * as _ from 'lodash';
import { Pet } from '../models/pet';
import { Person } from '../models/person';
import { PetsByPersonGender } from '../models/pets-by-person-gender';

@Injectable()
export class PeopleService {

  constructor(private http: HttpClient) { }

  getPetsByPersonGender(): Observable<PetsByPersonGender[]> {
    return this.http
      .get<Person[]>('/api/people')
      .map(people => _(people)
        .groupBy((person: Person) => person.gender)
        .map((value, key) => ({
          gender: key,
          pets: _(value)
            .flatMap('pets')
            .filter((pet: Pet) => pet && pet.type === 'Cat')
            .sortBy('name')
            .value()
        }))
        .value())
      .catch(this.handleError);
  }

  private handleError(err: HttpErrorResponse) {
    let errMsg: string;
    if (err.error instanceof Error) {
      errMsg = err.error.message;
    } else {
      errMsg = `${err.status} - ${err.statusText || ''}`;
    }
    return Observable.throw(errMsg);
  }
}
