import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { ClassManagementService } from '../../../../services/classmanagement.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-class-supervision',
  imports: [CommonModule, FormsModule],
  templateUrl: './class-supervision.component.html',
  styleUrl: './class-supervision.component.css'
})
export class ClassSupervisionComponent implements OnInit {
  classList: any[] = [];
  newClass: any = {
    id: '',
    className: '',
    room: '',
    duration: '',
    idTeacher: '',
    listStudent: [],
  };

  constructor(
    private classManagementService: ClassManagementService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchClasses();
  }

  fetchClasses(): void {
    this.classManagementService.getAllClasses().subscribe({
      next: (data) => {
        this.classList = data;
      },
      error: (err) => {
        this.toastr.error('Failed to fetch classes');
        console.error(err);
      },
    });
  }

  createClass(): void {
    const newClassData = {
      ...this.newClass,
      listStudent: this.newClass.listStudent
        ? this.newClass.listStudent.split(',').map((s: string) => s.trim())
        : [],
    };
    this.classManagementService.createClass(newClassData).subscribe({
      next: (res) => {
        this.toastr.success('Class created successfully');
        this.classList.push(res);
        this.resetNewClassForm();
      },
      error: (err) => {
        this.toastr.error('Failed to create class');
        console.error(err);
      },
    });
  }

  resetNewClassForm(): void {
    this.newClass = {
      id: '',
      className: '',
      room: '',
      duration: '',
      idTeacher: '',
      listStudent: [],
    };
  }

  viewClassDetails(classId: string): void {
    this.router.navigate(['admin/class-detail', classId]);
  }

  navigateToProfile(code: string): void {
    this.router.navigate(['admin/profile-detail', code]);
  }
}
