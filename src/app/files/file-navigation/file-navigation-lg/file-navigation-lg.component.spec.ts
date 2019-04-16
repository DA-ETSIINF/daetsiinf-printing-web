import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileNavigationLgComponent } from './file-navigation-lg.component';

describe('FileNavigationLgComponent', () => {
  let component: FileNavigationLgComponent;
  let fixture: ComponentFixture<FileNavigationLgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileNavigationLgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileNavigationLgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
