import { async, ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EmployeeAddEditComponent } from './employee-add-edit.component';

describe('EmployeeAddEditComponent', () => {
  let component: EmployeeAddEditComponent;
  let fixture: ComponentFixture<EmployeeAddEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeAddEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
