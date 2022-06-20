import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeboxsellComponent } from './tradeboxsell.component';

describe('TradeboxsellComponent', () => {
  let component: TradeboxsellComponent;
  let fixture: ComponentFixture<TradeboxsellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TradeboxsellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeboxsellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
