import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPartnerModalComponent } from './new-partner-modal.component';

describe('NewPartnerModalComponent', () => {
  let component: NewPartnerModalComponent;
  let fixture: ComponentFixture<NewPartnerModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewPartnerModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPartnerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
