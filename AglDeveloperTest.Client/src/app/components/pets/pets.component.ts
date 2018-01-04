import { Component, OnInit } from '@angular/core';
import { PeopleService } from '../../services/people.service';
import { PetsByPersonGender } from '../../models/pets-by-person-gender';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.css']
})
export class PetsComponent implements OnInit {
  petsGroups: PetsByPersonGender[];
  errorMessage: string;

  constructor(private peopleService: PeopleService) { }

  ngOnInit() {
    this.peopleService.getCatsByPersonGender().subscribe(
      response => {
        this.petsGroups = response;
      }, error => {
        this.errorMessage = error;
      });
  }
}
