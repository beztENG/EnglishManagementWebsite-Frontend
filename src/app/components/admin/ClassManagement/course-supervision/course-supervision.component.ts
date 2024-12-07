import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CourseService } from '../../../../services/course.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-course-supervision',
  imports: [CommonModule, FormsModule],
  templateUrl: './course-supervision.component.html',
  styleUrl: './course-supervision.component.css'
})
export class CourseSupervisionComponent implements OnInit {
  courses: any[] = [];

  newCourse: any = {
    courseId: '',
    name: '',
    description: '',
    status: true,
  };

  constructor(
    private courseService: CourseService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchCourses();
  }

  fetchCourses(): void {
    this.courseService.getAllCourses().subscribe({
      next: (data) => {
        this.courses = data;
      },
      error: (err) => {
        this.toastr.error('Failed to fetch courses');
        console.error(err);
      }
    });
  }
  addCourse(): void {
    if (!this.newCourse.courseId) {
      this.toastr.error('Course ID is required');
      return;
    }

    this.courseService.addCourse(this.newCourse).subscribe({
      next: (data) => {
        this.toastr.success('Course added successfully');
        this.fetchCourses(); // Refresh the course list
        this.newCourse = { courseId: '', name: '', description: '', status: true }; // Reset form
      },
      error: (err) => {
        this.toastr.error('Failed to add course');
        console.error(err);
      },
    });
  }

  activateCourse(courseId: string): void {
    this.courseService.activateCourse(courseId).subscribe({
      next: () => {
        this.toastr.success('Course activated successfully!');
        this.fetchCourses(); // Refresh the course list
      },
      error: (err) => {
        this.toastr.error('Failed to activate course');
        console.error(err);
      }
    });
  }
  
  deactivateCourse(courseId: string): void {
    this.courseService.deactivateCourse(courseId).subscribe({
      next: () => {
        this.toastr.success('Course deactivated successfully!');
        this.fetchCourses(); // Refresh the course list
      },
      error: (err) => {
        this.toastr.error('Failed to deactivate course');
        console.error(err);
      }
    });
  }

  navigateToCourseDetail(courseId: String): void {
    this.router.navigate(['admin/course-detail', courseId]); 
  }
  
}
