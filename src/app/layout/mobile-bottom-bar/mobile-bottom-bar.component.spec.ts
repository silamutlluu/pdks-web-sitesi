import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileBottomBarComponent } from './mobile-bottom-bar.component';

describe('MobileBottomBarComponent', () => {
  let component: MobileBottomBarComponent;
  let fixture: ComponentFixture<MobileBottomBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileBottomBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobileBottomBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
