import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisasterInfoComponent } from './disaster-info.component';

describe('DisasterInfoComponent', () => {
  let component: DisasterInfoComponent;
  let fixture: ComponentFixture<DisasterInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisasterInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisasterInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
