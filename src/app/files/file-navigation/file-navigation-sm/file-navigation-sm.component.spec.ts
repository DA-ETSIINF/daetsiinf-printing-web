import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileNavigationSmComponent } from './file-navigation-sm.component';

describe('FileNavigationSmComponent', () => {
  let component: FileNavigationSmComponent;
  let fixture: ComponentFixture<FileNavigationSmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileNavigationSmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileNavigationSmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
