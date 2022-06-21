import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsShareComponent } from './news-share.component';

describe('NewsShareComponent', () => {
  let component: NewsShareComponent;
  let fixture: ComponentFixture<NewsShareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsShareComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
