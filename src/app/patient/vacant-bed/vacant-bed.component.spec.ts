import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VacantBedComponent } from './vacant-bed.component';

describe('VacantBedComponent', () => {
  let component: VacantBedComponent;
  let fixture: ComponentFixture<VacantBedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VacantBedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VacantBedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
