import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';

describe('ConfirmationDialogComponent', () => {
  let component: ConfirmationDialogComponent;
  let fixture: ComponentFixture<ConfirmationDialogComponent>;
  
  const dialogMock = {
    close: () => {}
  };

  const data = {
    title: "Header", 
    message: "Some message",
    cancelText: "Cancel",
    confirmText: "Confirm"
  }

  beforeEach(async () => {   
    await TestBed.configureTestingModule({
      imports: [ MatDialogModule ],
      declarations: [ ConfirmationDialogComponent ],
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

    fixture = TestBed.createComponent(ConfirmationDialogComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should confirm the header and content of modal ', () => {
    const config = { data }

    expect(fixture.debugElement.nativeElement.querySelector('h1')?.textContent).toBe(config.data.title);
    expect(fixture.debugElement.nativeElement.querySelector('.mat-mdc-dialog-content')?.textContent).toBe(config.data.message);
  });

  it('Cancel button calls this cancel function', () => {
    spyOn(component, 'cancel');
    fixture.detectChanges();
    
    const buttons = fixture.debugElement.nativeElement.querySelectorAll("button");

    buttons[0].click();

    expect(component.cancel).toHaveBeenCalled()
  });

  it('Confirm button calls this confirm function', () => {
    spyOn(component, 'confirm');
    fixture.detectChanges();
    
    const buttons = fixture.debugElement.nativeElement.querySelectorAll("button");

    buttons[1].click();

    expect(component.confirm).toHaveBeenCalled()
  });

  it('dialog is closed closed after cancel', () => {
    let spy = spyOn(component.dialogRef, 'close');
    
    component.cancel()

    expect(spy).toHaveBeenCalled()
  });

  it('dialog is closed after confirm()', () => {
    let spy = spyOn(component.dialogRef, 'close');
    
    component.confirm()

    expect(spy).toHaveBeenCalledWith(true)
  });

});
