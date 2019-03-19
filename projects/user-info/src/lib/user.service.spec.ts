import {  async, ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { UserService } from './user.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';



describe('UserService', () => {

  let injector: TestBed;
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],      
      providers: [
         
        UserService
      ]
    });
    injector = getTestBed();
    service = injector.get(UserService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('User loggedIn should be false', () => {
    

    service.getUser().subscribe(
      x => expect(x.loggedIn).toBeFalsy,
      err => console.log('Error. ' + err),
      () => console.log('complete notification')
    );
  });

  it('User info should be Max', () => {
    
    const dummyUser = [
      {userName: 'maxm',
      firstName: 'Max',
      lastName: 'Mayer'}      
    ]

    service.getUserInfo("/user").subscribe(
      x => {
        console.log(x);
        expect(x[0].userName).toBe('maxm');
      }
    )

    const req = httpMock.expectOne('/user');
    expect(req.request.method).toBe("GET");
    req.flush(dummyUser);
  });
});
