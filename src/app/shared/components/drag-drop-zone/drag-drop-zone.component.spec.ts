import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DragDropZoneComponent} from './drag-drop-zone.component';

describe('DragDropZoneComponent', () => {
  let component: DragDropZoneComponent;
  let fixture: ComponentFixture<DragDropZoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DragDropZoneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DragDropZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
