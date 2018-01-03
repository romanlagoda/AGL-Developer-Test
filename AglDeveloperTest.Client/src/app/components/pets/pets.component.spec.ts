import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PetsComponent } from './pets.component';
import { PeopleService } from '../../services/people.service';
import { PetsByPersonGender } from '../../models/pets-by-person-gender'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

declare var jasmine: any;

describe('PetsComponent', () => {
  let component: PetsComponent;
  let fixture: ComponentFixture<PetsComponent>;
  let mockService: any;

  beforeEach(async(() => {
    mockService = jasmine.createSpyObj('PeopleServiceMock', ['getPetsByPersonGender']);
    mockService.getPetsByPersonGender.and.returnValue(Observable.of([new PetsByPersonGender()]));

    TestBed.configureTestingModule({
      declarations: [PetsComponent],
      providers: [{ provide: PeopleService, useValue: mockService }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get data from server', () => {
    expect(mockService.getPetsByPersonGender).toHaveBeenCalled();
  });
});
