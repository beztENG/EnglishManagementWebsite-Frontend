import { Component, OnInit } from '@angular/core';
import { StudentManagementService } from '../../../services/student-management.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { ClassManagementService } from '../../../services/classmanagement.service';
import { ClassRegisterService } from '../../../services/class-register.service';


@Component({
  selector: 'app-class-register',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './class-register.component.html',
  styleUrl: './class-register.component.css'
})
export class ClassRegisterComponent implements OnInit {
  registerForm!: FormGroup;
  waitingListForm!: FormGroup;
  responseMessage: string | null = null;

  classes: any[] = [];
  waitingStudents: any[] = [];
  isLoadingClasses = false;
  isLoadingWaitingList = false;

  constructor(
    private fb: FormBuilder,
    private classRegisterService: ClassRegisterService,
    private classManagementService: ClassManagementService
  ) {}

  ngOnInit(): void {
    this.initForms();
    this.fetchAllClasses();
  }

  private initForms(): void {
    this.registerForm = this.fb.group({
      studentId: ['', Validators.required],
      classId: ['', Validators.required],
    });

    this.waitingListForm = this.fb.group({
      studentId: ['', Validators.required],
      classId: ['', Validators.required],
    });
  }

  fetchAllClasses(): void {
    this.isLoadingClasses = true;
    this.classManagementService.getAllClasses().subscribe({
      next: (data) => {
        this.classes = data;
        this.isLoadingClasses = false;
      },
      error: (err) => {
        console.error('Error fetching classes:', err);
        this.responseMessage = 'Failed to load classes.';
        this.isLoadingClasses = false;
      },
    });
  }

  fetchWaitingList(classId: string): void {
    this.isLoadingWaitingList = true;
    this.classRegisterService.getWaitingList(classId).subscribe({
      next: (data) => {
        this.waitingStudents = data;
        this.isLoadingWaitingList = false;
      },
      error: (err) => {
        console.error('Error fetching waiting list:', err);
        this.responseMessage = 'Failed to load waiting list.';
        this.isLoadingWaitingList = false;
      },
    });
  }

  onClassChange(event: Event): void {
    const classId = (event.target as HTMLSelectElement).value;
    this.fetchWaitingList(classId);
    this.registerForm.get('classId')?.setValue(classId);
    this.waitingListForm.get('classId')?.setValue(classId);
  }

  addStudentToClass(): void {
    const { studentId, classId } = this.registerForm.value;
    this.classRegisterService.addStudentToClass(studentId, classId).subscribe({
      next: (response) => (this.responseMessage = response),
      error: (err) => (this.responseMessage = `Error: ${err.message}`),
    });
  }

  approveWaitingListStudent(studentId: string): void {
    const classId = this.waitingListForm.get('classId')?.value;
    this.classRegisterService.approveWaitingListStudent(studentId, classId).subscribe({
      next: (response) => (this.responseMessage = response),
      error: (err) => (this.responseMessage = `Error: ${err.message}`),
    });
  }
}