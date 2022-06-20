import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchListSectionComponent } from './watch-list-section.component';

describe('WatchListSectionComponent', () => {
  let component: WatchListSectionComponent;
  let fixture: ComponentFixture<WatchListSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WatchListSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchListSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
