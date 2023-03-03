import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReservationListComponent } from './reservation-list/reservation-list.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '', component: ReservationListComponent },
    ])
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
