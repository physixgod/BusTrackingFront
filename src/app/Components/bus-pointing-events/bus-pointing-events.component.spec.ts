import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusPointingEventsComponent } from './bus-pointing-events.component';

describe('BusPointingEventsComponent', () => {
  let component: BusPointingEventsComponent;
  let fixture: ComponentFixture<BusPointingEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusPointingEventsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusPointingEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
