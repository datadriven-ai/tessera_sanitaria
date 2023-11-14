import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImporterModalComponent } from './importer-modal.component';

describe('ImporterModalComponent', () => {
  let component: ImporterModalComponent;
  let fixture: ComponentFixture<ImporterModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImporterModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImporterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
