import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrExchangeComponent } from './curr-exchange.component';

describe('CurrExchangeComponent', () => {
  let component: CurrExchangeComponent;
  let fixture: ComponentFixture<CurrExchangeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CurrExchangeComponent]
    });
    fixture = TestBed.createComponent(CurrExchangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
