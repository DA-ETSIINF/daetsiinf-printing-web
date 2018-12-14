import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickPrintComponent } from './quick-print.component';

describe('QuickPrintComponent', () => {
  let component: QuickPrintComponent;
  let fixture: ComponentFixture<QuickPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
