import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeboxbuyComponent } from './tradebox.component';

describe('TradeboxbuyComponent', () => {
  let component: TradeboxbuyComponent;
  let fixture: ComponentFixture<TradeboxbuyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TradeboxbuyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeboxbuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
