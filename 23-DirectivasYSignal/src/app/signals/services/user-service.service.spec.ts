import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule

import { UserServiceService } from './user-service.service';

describe('UserServiceService', () => {
  let service: UserServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule], // Include HttpClientModule in imports
    });
    service = TestBed.inject(UserServiceService);
  });

  it('should get user id 2', (done: DoneFn) => {
    expect(service).toBeTruthy();
    service.getUserById(2).subscribe(x => {
      expect(typeof x.data.id).toBe("number");
      expect(x.data.id).toBe(2);
      done();
    })

  });
});


