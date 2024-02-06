import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAfspraakComponent } from './list-afspraak.component';

describe('ListAfspraakComponent', () => {
  let component: ListAfspraakComponent;
  let fixture: ComponentFixture<ListAfspraakComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListAfspraakComponent]
    });
    fixture = TestBed.createComponent(ListAfspraakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
