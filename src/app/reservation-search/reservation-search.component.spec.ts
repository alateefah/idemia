import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationSearchComponent } from './reservation-search.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ReservationSearchComponent', () => {
  let component: ReservationSearchComponent;
  let fixture: ComponentFixture<ReservationSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ MatCardModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule, BrowserAnimationsModule ],
      declarations: [ ReservationSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservationSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should count the number of input elements', () => {
    const inputs = fixture.debugElement.nativeElement.querySelectorAll('input');
    expect(inputs.length).toEqual(3);
  });

  it('check the value of initial element', () => {
    const searchFormValues = {
        firstName: '',
        lastName: '',
        phone: ''
    }
    expect(component.searchForm.value).toEqual(searchFormValues);
  });

  it('compare value entered in form with Form Group value ', () => {
    const searchFormValues = {
        firstName: 'Test First Name',
        lastName: 'Test Last Name',
        phone: 'Test Phone'
    }
    spyOn(component.emitSearchParams, 'emit')
    
    const input: HTMLInputElement[] = fixture.debugElement.nativeElement.querySelectorAll('input');
    input[0].value = searchFormValues.firstName;
    input[0].dispatchEvent(new Event('input'));

    input[1].value = searchFormValues.lastName
    input[1].dispatchEvent(new Event('input'));

    input[2].value = searchFormValues.phone
    input[2].dispatchEvent(new Event('input'));

    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();

    expect(component.searchForm.value).toEqual(searchFormValues);
  });

  it('check search params in not emitted when form is empty', () => {
    spyOn(component.emitSearchParams, 'emit')
    const searchFormValues = {
        firstName: '',
        lastName: '',
        phone: ''
    }
    component.searchForm.setValue({...searchFormValues});

    component.search();

    expect(component.emitSearchParams.emit).not.toHaveBeenCalled();
  });

  it('check search params is emitted when form is empty', () => {
    spyOn(component.emitSearchParams, 'emit')
    const searchFormValues = {
        firstName: 'Latee',
        lastName: '',
        phone: ''
    }
    component.searchForm.setValue({...searchFormValues});

    component.search();

    expect(component.emitSearchParams.emit).toHaveBeenCalled();
  });


  it('check search is called when search button is clicked with form data', () => {

    spyOn(component.emitSearchParams, 'emit')
    const input: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('input');
    input.value = "Test First Name";
    input.dispatchEvent(new Event('input'));

    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();

    expect(component.emitSearchParams.emit).toHaveBeenCalled();
  });

  it('check search is not called when search button is clicked without form data', () => { 
    spyOn(component.emitSearchParams, 'emit')
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();

    expect(component.emitSearchParams.emit).not.toHaveBeenCalled();
  });

});
