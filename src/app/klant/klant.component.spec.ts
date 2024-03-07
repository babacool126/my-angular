import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KlantComponent } from './klant.component';

describe('KlantComponent', () => {
  let component: KlantComponent;
  let fixture: ComponentFixture<KlantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KlantComponent]
    });
    fixture = TestBed.createComponent(KlantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
