import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociateMedicsComponent } from './associate-medics.component';

describe('AssociateMedicsComponent', () => {
  let component: AssociateMedicsComponent;
  let fixture: ComponentFixture<AssociateMedicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssociateMedicsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociateMedicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
