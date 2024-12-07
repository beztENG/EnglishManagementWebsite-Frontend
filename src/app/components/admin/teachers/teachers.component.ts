import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProfileService } from '../../../services/profile.service';
import { Profile } from '../../interfaces/profile.model';
import { TeacherService } from '../../../services/teacher.service';
@Component({
  selector: 'app-teachers',
  imports: [CommonModule],
  templateUrl: './teachers.component.html',
  styleUrl: './teachers.component.css'
})
export class TeachersComponent {
  teachers: any[] = [];
  
  constructor(
    private teacherService: TeacherService,
    private profileService: ProfileService,
    private router: Router
  ) {}
  profile!: Profile; 

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    const teacherRoleId = 'teacher';
    this.teacherService.getUsersByRole(teacherRoleId).subscribe((data) => {
      this.teachers = data;
    });
  }

  viewProfile(code: string): void {
    this.profileService.getProfileByCode(code).subscribe({
      next: (profile) => {
        this.router.navigate([`/admin/teachers/profile/${code}`], { state: { profile } });
      },
      error: (err) => alert('Error loading profile: ' + err.message),
    });
  }
}
