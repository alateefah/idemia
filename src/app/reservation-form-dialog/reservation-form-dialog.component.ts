import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { Observable, map, startWith } from 'rxjs';
import IReservation from '../core/models/reservation';

export interface IReservationFormDialogData {
  action: "new"|"view"|"edit";
  reservation?: IReservation;
}

@Component({
  selector: 'app-reservation-form-dialog',
  templateUrl: './reservation-form-dialog.component.html',
  styleUrls: ['./reservation-form-dialog.component.css']
})

export class ReservationFormDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ReservationFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IReservationFormDialogData,
  ) {}

  //General Declarations
  reservationForm: FormGroup;
  minDate: Date;
  minDepartureDate: Date;
  
  ngOnInit() {
    this.reservationForm = new FormGroup({
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
      confirm: new FormControl("", Validators.required)
    });

    // State Autocomplete related
    this.filteredStates = this.reservationForm.get('addressLocation.state')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

    // Set min date for departure when arrival changes
    if(this.data.action === "new") {
      this.minDate = new Date();
      this.minDepartureDate = this.minDate;
      this.reservationForm.get('stay.arrivalDate')!.valueChanges.subscribe(selectedValue => {
        this.minDepartureDate = selectedValue;                      
      })
    }

    if(this.data.action !== "new") {
      this.reservationForm.setValue({...this.data.reservation})
      this.tags = this.data.reservation!.tags
    }
  }

  /*
   * Dialog related
  */  
  onNoClick(): void {
    this.dialogRef.close();
  }

  /*
   * State Autocomplete related
  */   
  states: string[] = ['Arizona', 'California', "Alberta", "British Columbia", "Manitoba"];
  filteredStates: Observable<string[]>;
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.states.filter(option => option.toLowerCase().includes(filterValue));
  }

  /*
  * Extras
  */
  extraList: any[] = [
      {value: 'extraBreakfast', name: 'Extra Breakfast'},
      {value: 'extraTV', name: 'Extra TV'},
      {value: 'extraWiFi', name: 'Extra WiFi'},
      {value: 'extraParking', name: 'Extra Parking'},
      {value: 'extraBalcony', name: 'Extra Balcony'}
  ];
  
  /*
   * Tag Functionalities
  */  
  addTagOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  tags: string[];

  addTag(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.tags.push(value);
    }

    event.chipInput!.clear();
  }

  removeTag(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  editTag(tag: string, event: MatChipEditedEvent) {
    const value = event.value.trim();

    if (!value) {
      this.removeTag(tag);
      return;
    }

    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags[index] = value;
    }
  }

  /**
   * Submit Functionalities
  */  
  onSubmit () {
    this.dialogRef.close(this.reservationForm.value);
  }
}
