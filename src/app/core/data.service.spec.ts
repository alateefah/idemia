import { TestBed } from '@angular/core/testing';

import { DataService } from './data.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import IReservation from './models/reservation';
import { defer } from 'rxjs';
import { HttpClient } from '@angular/common/http';

describe('DataService (with spies)', () => {
  let dataService: DataService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    dataService = new DataService(httpClientSpy);
  });

  it('should be created', () => {
    expect(dataService).toBeTruthy();
  });

  it('should return expected reservations (HttpClient called once)', ()=> {

    const expectedReservations:IReservation[] = [];

    httpClientSpy.get.and.returnValue(asyncData(expectedReservations));
    
    dataService.getReservations().subscribe({
      next: heroes => expect(heroes)
        .withContext('should return expected heroes')
        .toEqual(expectedReservations),
      error: fail
    });

    expect(httpClientSpy.get.calls.count())
    .withContext('one call')
    .toBe(1);
  })

});

describe('DataService (with mocks)', () => {
  let dataService: DataService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    dataService = TestBed.inject(DataService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should return expected reservations (called once)', ()=> {

    const expectedReservations:IReservation[] = [];
    
    dataService.getReservations().subscribe(data => {
      expect(data).toEqual(expectedReservations);
    });

    const req = httpTestingController.expectOne(dataService.reservationUrl);
    expect(req.request.method).toEqual('GET');

    req.flush(expectedReservations);
  })

});

export function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}

