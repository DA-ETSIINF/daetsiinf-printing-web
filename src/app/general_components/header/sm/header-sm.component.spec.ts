import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderSmComponent } from './header-sm.component';

describe('HeaderSmComponent', () => {
  let component: HeaderSmComponent;
  let fixture: ComponentFixture<HeaderSmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderSmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderSmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
