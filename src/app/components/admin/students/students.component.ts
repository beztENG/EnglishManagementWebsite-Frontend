import { Component, OnInit  } from '@angular/core';
import { StudentService } from '../../../services/student.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProfileService } from '../../../services/profile.service';
import { Profile } from '../../interfaces/profile.model';
@Component({
  selector: 'app-students',
  imports: [CommonModule],
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent implements OnInit {
    students: any[] = [];

    constructor(
      private studentService: StudentService,
      private profileService: ProfileService,
      private router: Router
    ) {}
    profile!: Profile; // Use the imported Profile type

    ngOnInit(): void {
      this.loadStudents();
    }

    loadStudents(): void {
      const studentRoleId = 'student';
      this.studentService.getUsersByRole(studentRoleId).subscribe((data) => {
        this.students = data;
      });
    }

    viewProfile(code: string): void {
      this.profileService.getProfileByCode(code).subscribe({
        next: (profile) => {
          this.router.navigate([`/admin/students/profile/${code}`], { state: { profile } });
        },
        error: (err) => alert('Error loading profile: ' + err.message),
      });
    }
}


