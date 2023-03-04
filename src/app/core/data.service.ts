import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import IReservation from './models/reservation';

@Injectable({
  providedIn: 'root'
})

export class DataService {
    public constructor(private http: HttpClient) {}
    readonly reservationUrl = './assets/reservations.json';
    
    getReservations () {
      return this.http.get<IReservation[]>(this.reservationUrl);
    }
  
}