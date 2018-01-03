import { Component } from '@angular/core';
import { PeopleService } from '../../services/people.service';
import { PetsByPersonGender } from '../../models/pets-by-person-gender'

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.css']
})
export class PetsComponent {

  petsGroups: PetsByPersonGender[];

  constructor(private peopleService: PeopleService) { }

  ngOnInit() {
    this.peopleService.getPetsByPersonGender().subscribe(response => {
      this.petsGroups = response;
    });
  }

}
