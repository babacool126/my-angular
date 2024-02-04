import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAfspraakComponent } from './create-afspraak.component';

describe('CreateAfspraakComponent', () => {
  let component: CreateAfspraakComponent;
  let fixture: ComponentFixture<CreateAfspraakComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateAfspraakComponent]
    });
    fixture = TestBed.createComponent(CreateAfspraakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
