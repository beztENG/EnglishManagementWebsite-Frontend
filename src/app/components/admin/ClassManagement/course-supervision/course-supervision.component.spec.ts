import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseSupervisionComponent } from './course-supervision.component';

describe('CourseSupervisionComponent', () => {
  let component: CourseSupervisionComponent;
  let fixture: ComponentFixture<CourseSupervisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseSupervisionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseSupervisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
