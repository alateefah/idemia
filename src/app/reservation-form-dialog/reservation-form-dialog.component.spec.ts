import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationFormDialogComponent } from './reservation-form-dialog.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import IReservation from "../core/models/reservation";
import { CommonModule } from '@angular/common';

describe('ReservationFormDialogComponent', () => {
  let component: ReservationFormDialogComponent;
  let fixture: ComponentFixture<ReservationFormDialogComponent>;

  const reservation = {
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
    "payment": "cc" as const,
    "note": "idm lab test",
    "tags": [
    "hotel",
    "booking",
    "labtest"
    ],
    "reminder": true,
    "newsletter": true,
    "confirm": false
  }
  
  const dialogMock = {
    close: () => {}
  };

  const formGroup = new FormGroup({
    stay: new FormGroup({
      arrivalDate: new FormControl("", Validators.required),
      departureDate: new FormControl("", Validators.required),
    }),
    room: new FormGroup({
      roomSize: new FormControl("", Validators.required),
      roomQuantity: new FormControl("", Validators.required),
    }),
    firstName: new FormControl("", [Validators.required, Validators.min(2)]),
    lastName: new FormControl("", [Validators.required, Validators.min(2)]),
    email: new FormControl("", [Validators.email, Validators.required]),
    phone: new FormControl("", Validators.required),
    addressStreet: new FormGroup({
      streetName: new FormControl("", Validators.required),
      streetNumber: new FormControl("", Validators.required),
    }),
    addressLocation: new FormGroup({
      zipCode: new FormControl("", Validators.required),
      state: new FormControl("", Validators.required),
      city: new FormControl("", Validators.required)
    }),
    extras: new FormControl(""),
    payment: new FormControl("", Validators.required),
    note: new FormControl(""),
    tags: new FormControl(""),
    reminder: new FormControl("", Validators.required),
    newsletter: new FormControl("", Validators.required),
    confirm: new FormControl("")
  })

  const data = {
    action: "view",
    reservation: formGroup.value
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ 
        MatDialogModule, 
        MatFormFieldModule, 
        ReactiveFormsModule, 
        MatInputModule, 
        BrowserAnimationsModule, 
        MatDatepickerModule, 
        MatNativeDateModule,
        MatSelectModule,
        MatAutocompleteModule,
        MatChipsModule,
        MatRadioModule,
        MatSlideToggleModule,
        MatCheckboxModule,
        MatIconModule,
        CommonModule
      ],
      declarations: [ ReservationFormDialogComponent ],
      providers: [
        {
            provide: MatDialogRef,
            useValue: dialogMock,
        },
        {
            provide: MAT_DIALOG_DATA,
            useValue: data
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservationFormDialogComponent);
    component = fixture.componentInstance;
    component.ngOnInit(); 
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.reservationForm.value).toEqual(formGroup.value);
    const header = fixture.debugElement.nativeElement.querySelector('h2').textContent;
    expect(header).toEqual("View Reservation")
  });

  it("test value of form is equal to value passed into the dialog", () => {

    component.data = {
        action: "view",
        reservation: reservation
    }

    component.ngOnInit()
    
    expect(component.reservationForm.value).toEqual(reservation)
  })

  it("test value of minDate and minDeparture when dialog is opened with 'new' action", () => {

    component.data = {
        action: "new",
        reservation: reservation
    }

    component.ngOnInit();

    expect(component.minDate).toEqual(new Date());
    expect(component.minDepartureDate).toEqual(new Date());
  })

  it("test value of minDeparture changes when arrivalDate is changed", () => {
    component.data = {
        action: "new",
        reservation: reservation
    }
    component.ngOnInit();

    expect(component.minDepartureDate.toDateString()).toEqual(new Date().toDateString());

    const input: HTMLInputElement[] = fixture.debugElement.nativeElement.querySelectorAll('input');
    console.log(input)
    input[3].value = "leee";
    input[3].dispatchEvent(new Event('input'));
    fixture.detectChanges()
    fixture.whenStable().then((e)=>{
        console.log(e)
        console.log(component.reservationForm.value)
    })

    console.log(component.reservationForm.value)

    
    // expect(component.minDepartureDate.toDateString()).toEqual(new Date().toDateString());
  })

    it ("tests onNoClick closes the dialog", () => {
        let spy = spyOn(component.dialogRef, 'close');
    
        component.onNoClick()

        expect(spy).toHaveBeenCalled();
    });

//   it("tests addTag adds value to tag[] and reservationForm", () => {

//   })
});