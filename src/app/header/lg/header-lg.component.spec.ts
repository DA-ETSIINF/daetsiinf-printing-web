import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderLgComponent } from './header-lg.component';

describe('HeaderLgComponent', () => {
  let component: HeaderLgComponent;
  let fixture: ComponentFixture<HeaderLgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderLgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderLgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
