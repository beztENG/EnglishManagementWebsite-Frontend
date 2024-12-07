import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../../../services/course.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-detail',
  imports: [FormsModule, CommonModule],
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.css'
})
export class CourseDetailComponent implements OnInit {
  courseId: string | null = null;
  courseDetails: any = {
    courseId: '',
    name: '',
    description: '',
    status: false,
  };

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('courseId');
    if (this.courseId) {
      this.fetchCourseDetails(this.courseId);
    }
  }

  fetchCourseDetails(courseId: string): void {
    this.courseService.getCourseById(courseId).subscribe({
      next: (data) => {
        this.courseDetails = data;
      },
      error: (err) => {
        this.toastr.error('Failed to fetch course details');
        console.error(err);
      },
    });
  }

  updateCourse(): void {
    this.courseService.updateCourse(this.courseDetails).subscribe({
      next: () => {
        this.toastr.success('Course updated successfully');
        this.router.navigate(['/admin/course-supervision']); // Navigate back to admin dashboard
      },
      error: (err) => {
        this.toastr.error('Failed to update course');
        console.error(err);
      },
    });
  }

  activateCourse(): void {
    if (this.courseDetails.courseId) {
      this.courseService.activateCourse(this.courseDetails.courseId).subscribe({
        next: () => {
          this.courseDetails.status = true;
          this.toastr.success('Course activated successfully');
        },
        error: (err) => {
          this.toastr.error('Failed to activate course');
          console.error(err);
        },
      });
    }
  }

  deactivateCourse(): void {
    if (this.courseDetails.courseId) {
      this.courseService.deactivateCourse(this.courseDetails.courseId).subscribe({
        next: () => {
          this.courseDetails.status = false;
          this.toastr.success('Course deactivated successfully');
        },
        error: (err) => {
          this.toastr.error('Failed to deactivate course');
          console.error(err);
        },
      });
    }
  }
}
