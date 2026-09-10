import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceWizardComponent } from './device-wizard.component';

describe('DeviceWizardComponent', () => {
  let component: DeviceWizardComponent;
  let fixture: ComponentFixture<DeviceWizardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeviceWizardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeviceWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
