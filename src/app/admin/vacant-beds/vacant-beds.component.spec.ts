import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VacantBedsComponent } from './vacant-beds.component';

describe('VacantBedsComponent', () => {
  let component: VacantBedsComponent;
  let fixture: ComponentFixture<VacantBedsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VacantBedsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VacantBedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
