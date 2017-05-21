import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DclWrapperComponent } from './dcl-wrapper.component';

describe('DclWrapperComponent', () => {
  let component: DclWrapperComponent;
  let fixture: ComponentFixture<DclWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DclWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DclWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
