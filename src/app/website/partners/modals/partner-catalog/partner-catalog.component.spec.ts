import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerCatalogComponent } from './partner-catalog.component';

describe('PartnerCatalogComponent', () => {
  let component: PartnerCatalogComponent;
  let fixture: ComponentFixture<PartnerCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartnerCatalogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
