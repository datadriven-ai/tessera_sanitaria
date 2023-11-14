import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ReservationInfoModal} from './reservation-info-modal.component';

describe('BookingInfoModalComponent', () => {
  let component: ReservationInfoModal;
  let fixture: ComponentFixture<ReservationInfoModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservationInfoModal ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationInfoModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
