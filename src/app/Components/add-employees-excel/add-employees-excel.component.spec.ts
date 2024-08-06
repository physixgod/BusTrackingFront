import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmployeesExcelComponent } from './add-employees-excel.component';

describe('AddEmployeesExcelComponent', () => {
  let component: AddEmployeesExcelComponent;
  let fixture: ComponentFixture<AddEmployeesExcelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEmployeesExcelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEmployeesExcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
