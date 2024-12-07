import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassSupervisionComponent } from './class-supervision.component';

describe('ClassSupervisionComponent', () => {
  let component: ClassSupervisionComponent;
  let fixture: ComponentFixture<ClassSupervisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassSupervisionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassSupervisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
