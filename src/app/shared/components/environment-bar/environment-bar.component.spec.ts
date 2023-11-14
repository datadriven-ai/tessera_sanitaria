import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvironmentBarComponent } from './environment-bar.component';

describe('EnvironmentBarComponent', () => {
  let component: EnvironmentBarComponent;
  let fixture: ComponentFixture<EnvironmentBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnvironmentBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnvironmentBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
