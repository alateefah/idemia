import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reservation-search',
  templateUrl: './reservation-search.component.html',
  styleUrls: ['./reservation-search.component.css']
})

export class ReservationSearchComponent implements OnInit {

  searchForm: FormGroup;
  @Output() emitSearchParams = new EventEmitter();

  ngOnInit() {
    this.searchForm = new FormGroup({
      firstName: new FormControl("", [Validators.min(2)]),
      lastName: new FormControl("", [Validators.min(2)]),
      phone: new FormControl("")
    })
  }

  search() {
    const values = this.searchForm.value;
    if(values.firstName || values.lastName || values.phone) {
      this.emitSearchParams.emit(this.searchForm.value);
    }
  }

}