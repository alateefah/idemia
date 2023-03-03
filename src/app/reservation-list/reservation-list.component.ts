
import { Component, OnInit } from "@angular/core";
import { DataService } from "../core/data.service";
import { MatDialog } from "@angular/material/dialog";
import { ReservationFormDialogComponent } from "../reservation-form-dialog/reservation-form-dialog.component";
import IReservation from "../core/models/reservation";
import { ConfirmationDialogComponent } from "../shared/confirmation-dialog/confirmation-dialog.component";

@Component({
    selector: 'app-reservation-list',
    templateUrl: './reservation-list.component.html',
    styleUrls: ['./reservation-list.component.css']
})

export class ReservationListComponent implements OnInit {
    public reservations: IReservation[];
    public reservationsCopy: IReservation[];
    public displayedColumns: string[] = ['fullName', 'phone', 'email', 'roomDetails', 'actions'];
    constructor(private dataService: DataService, public dialog: MatDialog) {}

    async ngOnInit(): Promise<void> {
        await this.dataService.getReservations().subscribe(result => {
            this.reservations = result;
            this.reservationsCopy = result;
        });

    }

    addReservation(): void {
      const dialogRef = this.dialog.open(ReservationFormDialogComponent, {
        data: {action: "new"}
      });
  
      dialogRef.afterClosed().subscribe((result: IReservation) => {
        if (result) {
          const destructuredReservations = [...this.reservations];
          destructuredReservations.push(result);
          this.reservations = destructuredReservations;
        }
      });
    }

    viewReservation(reservation: IReservation): void {
      this.dialog.open(ReservationFormDialogComponent, {
        data: {action: "view", reservation}
      });
    }

    editReservation(reservation: IReservation): void {
      const dialogRef = this.dialog.open(ReservationFormDialogComponent, {
        data: {action: "edit", reservation}
      });

      dialogRef.afterClosed().subscribe((result: IReservation) => {
        if (result) {
          const filterReservations = this.reservations.filter(record => record !== reservation);
          filterReservations.push(result);
          this.reservations = filterReservations;
        }
      });
    }

    deleteReservation(reservation: IReservation): void {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        data: {
          title: "Confirm Delete", 
          message: "Are you sure you want to delete",
          cancelText: "Cancel",
          confirmText: "Confirm"
        }
      });

      dialogRef.afterClosed().subscribe((deleteRecord: boolean) => {
        if (deleteRecord) {
          const filterReservations = this.reservations.filter(record => record !== reservation);
          this.reservations = filterReservations;
        }
      });
    }

    search(searchParam: any) {
      let destructuredReservations = [...this.reservationsCopy];
      
      destructuredReservations = destructuredReservations.filter(
        record => 
          searchParam.firstName && record.firstName.toLowerCase().includes(searchParam.firstName.toLowerCase())  ||
          searchParam.lastName && record.lastName.toLowerCase().includes(searchParam.lastName.toLowerCase()) ||
          searchParam.phone && record.phone.toLowerCase().includes(searchParam.phone.toLowerCase())
      )
      
      this.reservations = destructuredReservations;
    }
}