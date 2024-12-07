import { Component, OnInit } from '@angular/core';
import { ClassManagementService } from '../../../../services/classmanagement.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-class-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './class-management.component.html',
  styleUrls: ['./class-management.component.css']
})
export class ClassManagementComponent implements OnInit {
  classManagementList: any[] = [];
  classIdInputs: string[] = [];
  newClassManagement = { courseId: '', classIds: '' }; // Form data

  constructor(
    private classManagementService: ClassManagementService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.fetchClassManagementList();
  }

  fetchClassManagementList(): void {
    this.classManagementService.getAllClassManagement().subscribe({
      next: (data) => {
        this.classManagementList = data;
        this.classIdInputs = new Array(data.length).fill('');
      },
      error: (err) => {
        this.toastr.error('Failed to fetch class data');
        console.error(err);
      },
    });
  }

  addClass(courseId: string, index: number): void {
    const classId = this.classIdInputs[index];
    if (!classId.trim()) {
      this.toastr.error('Class ID cannot be empty');
      return;
    }

    this.classManagementService.addClassToCourse(courseId, classId).subscribe({
      next: (res) => {
        this.toastr.success('Class added successfully');
        this.classManagementList[index].classIds.push(classId); // Assuming classIds is an array
        this.classIdInputs[index] = ''; // Clear input after adding
      },
      error: (err) => {
        this.toastr.error('Failed to add class');
        console.error(err);
      },
    });
  }

  removeClass(courseId: string, index: number): void {
    const classId = this.classIdInputs[index];
    if (!classId.trim()) {
      this.toastr.error('Class ID cannot be empty');
      return;
    }

    this.classManagementService.removeClassFromCourse(courseId, classId).subscribe({
      next: (res) => {
        this.toastr.success('Class removed successfully');
        const classIds = this.classManagementList[index].classIds;
        const classIdIndex = classIds.indexOf(classId);
        if (classIdIndex > -1) {
          classIds.splice(classIdIndex, 1); // Remove class ID from the array
        }
        this.classIdInputs[index] = ''; // Clear input after removing
      },
      error: (err) => {
        this.toastr.error('Failed to remove class');
        console.error(err);
      },
    });
  }

  createClassManagement(): void {
    // Validate inputs
    if (!this.newClassManagement.courseId.trim() || !this.newClassManagement.classIds.trim()) {
      this.toastr.error('Course ID and Class IDs are required');
      return;
    }
  
    // Prepare the payload
    const classManagement = {
      courseId: this.newClassManagement.courseId,
      classIds: this.newClassManagement.classIds.split(',').map(id => id.trim()),
    };
  
    // Call the service
    this.classManagementService.createClassManagement(classManagement).subscribe({
      next: (res) => {
        this.toastr.success('Class Management created successfully');
        this.classManagementList.push(res); // Add the new entry to the list
        this.newClassManagement = { courseId: '', classIds: '' }; // Reset form
      },
      error: (err) => {
        this.toastr.error('Failed to create Class Management');
        console.error('Create error:', err);
      },
    });
  }
}