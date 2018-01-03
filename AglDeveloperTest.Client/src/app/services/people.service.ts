import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import * as _ from 'lodash';
import { Pet } from '../models/pet'
import { Person } from '../models/person'
import { PetsByPersonGender } from '../models/pets-by-person-gender'

@Injectable()
export class PeopleService {

  constructor(private http: Http) { }

  getPetsByPersonGender(): Observable<PetsByPersonGender[]> {
    return this.http
      .get('/api/people')
      .map((response: Response) => {
        let people = response.json() as Person[];
        return _(people)
          .groupBy((person: Person) => person.gender)
          .map((value, key) => ({
            gender: key,
            pets: _(value)
              .flatMap('pets')
              .filter((pet: Pet) => pet && pet.type === 'Cat')
              .sortBy('name')
              .value()
          }))
          .value();
      })
      .catch(this.handleError);
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      errMsg = `${error.status} - ${error.statusText || ''}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    return Observable.throw(errMsg);
  }
}
