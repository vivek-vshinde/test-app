import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TprintComponent } from './tprint.component';

describe('TprintComponent', () => {
  let component: TprintComponent;
  let fixture: ComponentFixture<TprintComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TprintComponent]
    });
    fixture = TestBed.createComponent(TprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
