import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPromoModalComponent } from './new-promo-modal.component';

describe('NewPromoModalComponent', () => {
  let component: NewPromoModalComponent;
  let fixture: ComponentFixture<NewPromoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewPromoModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPromoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
