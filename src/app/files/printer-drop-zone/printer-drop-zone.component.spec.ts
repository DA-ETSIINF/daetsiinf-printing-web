import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrinterDropZoneComponent } from './printer-drop-zone.component';

describe('PrinterDropZoneComponent', () => {
  let component: PrinterDropZoneComponent;
  let fixture: ComponentFixture<PrinterDropZoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrinterDropZoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrinterDropZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
