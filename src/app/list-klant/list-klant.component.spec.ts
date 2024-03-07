import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListKlantComponent } from './list-klant.component';

describe('ListKlantComponent', () => {
  let component: ListKlantComponent;
  let fixture: ComponentFixture<ListKlantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListKlantComponent]
    });
    fixture = TestBed.createComponent(ListKlantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
