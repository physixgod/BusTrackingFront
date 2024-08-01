import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeMapViewComponent } from './employee-map-view.component';

describe('EmployeeMapViewComponent', () => {
  let component: EmployeeMapViewComponent;
  let fixture: ComponentFixture<EmployeeMapViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeMapViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeMapViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
