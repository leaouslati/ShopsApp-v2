import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreMap } from './store-map';

describe('StoreMap', () => {
  let component: StoreMap;
  let fixture: ComponentFixture<StoreMap>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreMap],
    }).compileComponents();

    fixture = TestBed.createComponent(StoreMap);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
