import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusComponentComponent } from './bus-component.component';

describe('BusComponentComponent', () => {
  let component: BusComponentComponent;
  let fixture: ComponentFixture<BusComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
