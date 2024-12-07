import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageScoreComponent } from './manage-score.component';

describe('ManageScoreComponent', () => {
  let component: ManageScoreComponent;
  let fixture: ComponentFixture<ManageScoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageScoreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
