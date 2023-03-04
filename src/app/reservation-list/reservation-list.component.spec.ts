import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReservationListComponent } from './reservation-list.component';
import { DataService } from '../core/data.service';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { ReservationFormDialogComponent } from '../reservation-form-dialog/reservation-form-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ReactiveFormsModule } from '@angular/forms';
import { ReservationSearchComponent } from '../reservation-search/reservation-search.component';
import { MatCardModule } from '@angular/material/card';
import IReservation from '../core/models/reservation';
import { of } from 'rxjs';

describe('ReservationListComponent', () => {
  let component: ReservationListComponent;
  let fixture: ComponentFixture<ReservationListComponent>;
  let dataService: DataService;
  const reservations: IReservation[] = [
    {
      "stay": {
      "arrivalDate": "2021-11-18T05:00:00.000Z",
      "departureDate": "2021-11-25T05:00:00.000Z"
      },
      "room": {
      "roomSize": "business-suite",
      "roomQuantity": 3
      },
      "firstName": "IDM",
      "lastName": "ENG",
      "email": "idm.test@idm.com",
      "phone": "9999999999",
      "addressStreet": {
      "streetName": "IDM Street",
      "streetNumber": "1234"
      },
      "addressLocation": {
      "zipCode": "123456",
      "state": "Arizona",
      "city": "OAKVILLE"
      },
      "extras": [
      "extraBreakfast",
      "extraTV",
      "extraWiFi",
      "extraParking",
      "extraBalcony"
      ],
      "payment": "cc",
      "note": "idm lab test",
      "tags": [
      "hotel",
      "booking",
      "labtest"
      ],
      "reminder": true,
      "newsletter": true,
      "confirm": false
    },
    {
      "stay": {
      "arrivalDate": "2021-11-01T04:00:00.000Z",
      "departureDate": "2021-11-04T04:00:00.000Z"
      },
      "room": {
      "roomSize": "presidential-suite",
      "roomQuantity": 2
      },
      "firstName": "IDM",
      "lastName": "PM",
      "email": "idm.op@idm.com",
      "phone": "123456789",
      "addressStreet": {
      "streetName": "IDM",
      "streetNumber": "1234"
      },
      "addressLocation": {
      "zipCode": "123456",
      "state": "Arkansas",
      "city": "OAK"
      },
      "extras": [
      "extraParking",
      "extraBalcony"
      ],
      "payment": "cash",
      "note": "lab test",
      "tags": [
      "angular",
      "material",
      "labtest"
      ],
      "reminder": true,
      "newsletter": false,
      "confirm": true
    }
  ];
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ 
        HttpClientTestingModule, 
        MatDialogModule, 
        MatTableModule, 
        MatFormFieldModule, 
        MatDatepickerModule, 
        MatNativeDateModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatSelectModule,
        MatAutocompleteModule,
        MatChipsModule,
        MatRadioModule,
        MatSlideToggleModule,
        MatCheckboxModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatCardModule ,
      ],
      declarations: [ ReservationSearchComponent, ReservationListComponent, ReservationFormDialogComponent ],
      providers: [ DataService ]
    })
    .compileComponents();
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationListComponent);
    component = fixture.componentInstance;
    
    dataService = TestBed.inject(DataService);

    spyOn(dataService, 'getReservations').and.returnValue(of(reservations));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title in a h2 tag', (() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain('Reservations');
  }));

  it('test add button appears on page', (() => {
    const compiled = fixture.debugElement.nativeElement;
    const buttons = compiled.querySelectorAll('button');
    expect(buttons[1].textContent).toContain('Add New');
  }));

  it('should tests the columns in the reservation table', (() => {
    const tableHeaders = fixture.nativeElement.querySelectorAll('th');
    
    expect(tableHeaders.length).toBe(5);
    expect(tableHeaders[0].innerHTML).toBe("Full name");
    expect(tableHeaders[1].innerHTML).toBe("Phone");
    expect(tableHeaders[2].innerHTML).toBe("Email");
    expect(tableHeaders[3].innerHTML).toBe("Note");
  }))

  it('should test addReservation method in component', (() => {
    const fixture = TestBed.createComponent(ReservationListComponent);
    const openDialogSpy = spyOn(component.dialog, 'open').and.callThrough();

    component.addReservation();

    fixture.detectChanges();
      
    const dialogConfig = {
      action: 'new'
    };
    
    expect(openDialogSpy).toHaveBeenCalledWith(ReservationFormDialogComponent, 
      {data: dialogConfig});
    
  }))

  it('should test viewReservation method in component', (() => {
    const fixture = TestBed.createComponent(ReservationListComponent);
    const openDialogSpy = spyOn(component.dialog, 'open').and.callThrough();
    const fakeReservation = {} as IReservation;

    component.viewReservation(fakeReservation);

    fixture.detectChanges();
      
    const dialogConfig = {
      action: 'view',
      reservation: fakeReservation
    };
    
    expect(openDialogSpy).toHaveBeenCalledWith(ReservationFormDialogComponent, 
      {data: dialogConfig});
    
  }))

  it('should test editReservation method in component', (() => {
    const fixture = TestBed.createComponent(ReservationListComponent);
    const openDialogSpy = spyOn(component.dialog, 'open').and.callThrough();
    const fakeReservation = {} as IReservation;

    component.editReservation(fakeReservation);

    fixture.detectChanges();
      
    const dialogConfig = {
      action: 'edit',
      reservation: fakeReservation
    };
    
    expect(openDialogSpy).toHaveBeenCalledWith(ReservationFormDialogComponent, 
      {data: dialogConfig});
    
  }))

  it('should test deleteReservation method in component', (() => {
    const fixture = TestBed.createComponent(ReservationListComponent);
    const openDialogSpy = spyOn(component.dialog, 'open').and.callThrough();
    const fakeReservation = {} as IReservation;

    component.deleteReservation(fakeReservation);

    fixture.detectChanges();
      
    expect(openDialogSpy).toHaveBeenCalled();
    
  }))

  it('should test that number of records remain the same method when updating a record', (() => {
    spyOn(component.dialog, 'open')
    .and
    .returnValue({afterClosed: () => of(reservations[0])} as MatDialogRef<unknown>);  
    
    component.editReservation(reservations[0]);
    
    expect(component.reservations.length).toBe(2);
    
  }))

  it('should test addReservation method adds a record', (() => {
    spyOn(component.dialog, 'open')
    .and
    .returnValue({afterClosed: () => of(reservations[0])} as MatDialogRef<unknown>);  
    
    component.addReservation();
    
    expect(component.reservations.length).toBe(3);
    
  }));

  it('should test deleteReservation method removes a record', (() => {
    spyOn(component.dialog, 'open')
    .and
    .returnValue({afterClosed: () => of(true)} as MatDialogRef<unknown>);  
    
    component.deleteReservation(reservations[0]);
    expect(component.reservations.length).toBe(1);
    
  }))

  it('should test search with values return result', (() => {
    const searchParam1 = {
      firstName: '',
      lastName: 'ENG',
      phone: ''
    }
    component.search(searchParam1);
    expect(component.reservations.length).toBe(1);
  }))
});
