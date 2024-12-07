import { Component, OnInit } from '@angular/core';
import { ClassManagementService } from '../../../../services/classmanagement.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // Import FormsModule
import { Router } from '@angular/router';

@Component({
  selector: 'app-classes',
  imports: [CommonModule, FormsModule],
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css'] // Fixed typo from styleUrl to styleUrls
})
export class ClassesComponent implements OnInit {
  classManagementList: any[] = [];

  constructor(private classManagementService: ClassManagementService,private router: Router ) {}

  ngOnInit(): void {
    this.loadClassManagementList();
  }

  loadClassManagementList(): void {
    this.classManagementService.getAllClassManagement().subscribe(
      (data: any[]) => {
        this.classManagementList = data;
      },
      (error) => {
        console.error('Error fetching class management data:', error);
      }
    );
  }

  hideCourse(courseId: string): void {
    this.classManagementService.hideCourse(courseId).subscribe(
      () => {
        // Update the status directly in the list
        const classManagement = this.classManagementList.find(cm => cm.courseId === courseId);
        if (classManagement) {
          classManagement.status = false; // Mark as hidden
        }
        alert('Course hidden successfully!');
      },
      (error) => {
        console.error('Error hiding course:', error);
      }
    );
  }

  exposeCourse(courseId: string): void {
    this.classManagementService.exposeCourse(courseId).subscribe(
      () => {
        const classManagement = this.classManagementList.find(cm => cm.courseId === courseId);
        if (classManagement) {
          classManagement.status = true;
        }
        alert('Course exposed successfully!');
      },
      (error) => {
        console.error('Error exposing course:', error);
      }
    );
  }

  navigateToClassManagement(): void {
    this.router.navigate(['admin/class-management']);
  }

  navigateToClassSupervision(): void{
    this.router.navigate(['admin/class-supervision'])
  }

  navigateToCourseSupervision(): void{
    this.router.navigate(['admin/course-supervision'])
  }
}