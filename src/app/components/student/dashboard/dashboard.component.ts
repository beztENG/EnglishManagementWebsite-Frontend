import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProfileService } from '../../../services/profile.service';
import { Profile } from '../../interfaces/profile.model';
import { TimetableService, ClassWithTimetable } from '../../../services/timetable.service';

@Component({
  selector: 'app-dashboard',
  imports: [FormsModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  currentDate: Date = new Date();
  daysInMonth: (number | null)[] = [];
  selectedDay: number | null = null;

  events: { classId: string; className: string; startDate: string; endDate: string; room: string }[] = [];
  profile: Profile | null = null;
  showCreateForm = false;
  formData: Profile = {
    id: '',
    firstName: '',
    lastName: '',
    dob: '',
    email: '',
    phoneNum: '',
    avatar: '',
    code: '',
  };

  studentId: string = '';
  classesWithTimetables: ClassWithTimetable[] = [];

  monthNames: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  constructor(private profileService: ProfileService, private timetableService: TimetableService) {
    this.updateDays();
  }

  ngOnInit(): void {
    this.fetchProfile();
  }

  updateDays() {
    const month = this.currentDate.getMonth();
    const year = this.currentDate.getFullYear();
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    const leadingDays: (number | null)[] = Array(firstDay).fill(null);
    const monthDays: (number | null)[] = Array.from({ length: lastDate }, (_, i) => i + 1);

    this.daysInMonth = leadingDays.concat(monthDays);
  }

  changeMonth(direction: number) {
    this.currentDate.setMonth(this.currentDate.getMonth() + direction);
    this.selectedDay = null;
    this.updateDays();
  }

  get currentMonthYear(): string {
    return `${this.monthNames[this.currentDate.getMonth()]} ${this.currentDate.getFullYear()}`;
  }

  onDayClick(day: number | null) {
    if (!day) return;
    this.selectedDay = day;
    this.fetchEventsForDate();
  }

  fetchEventsForDate() {
    const selectedDate = `${this.currentDate.getFullYear()}-${this.currentDate.getMonth() + 1}-${this.selectedDay}`;
    this.events = [];

    this.classesWithTimetables.forEach(item => {
      if (item.timetable) {
        item.timetable.schedule.forEach(schedule => {
          if (schedule.date === selectedDate) {
            this.events.push({
              classId: item.classInfo.id,
              className: item.classInfo.className,
              startDate: `${schedule.date} ${schedule.startDate}`,
              endDate: `${schedule.date} ${schedule.endDate}`,
              room: item.classInfo.room,
            });
          }
        });
      }
    });
  }

  fetchProfile() {
    const token = localStorage.getItem('authToken');
    if (!token) return;

    this.profileService.getProfile(token).subscribe({
      next: (data: Profile) => {
        this.profile = data;
        this.studentId = data.code;
        this.fetchStudentClassesAndTimetable();
      },
      error: () => {
        this.profile = null;
      },
    });
  }

  fetchStudentClassesAndTimetable() {
    const token = localStorage.getItem('authToken');
    if (!token) return;

    this.timetableService.getStudentClassesAndTimetable(this.studentId).subscribe({
      next: (data: ClassWithTimetable[]) => {
        this.classesWithTimetables = data;
      },
      error: (err) => {
        console.error('Error fetching classes and timetables:', err);
      },
    });
  }

  saveProfile() {
    const token = localStorage.getItem('authToken');
    if (!token) return;

    const request$ = this.profile
      ? this.profileService.updateProfile(this.formData, token)
      : this.profileService.createProfile(this.formData, token);

    request$.subscribe({
      next: (data: Profile) => {
        this.profile = data;
        this.showCreateForm = false;
      },
      error: (err) => {
        console.error('Error saving profile:', err);
      },
    });
  }

  openForm() {
    this.showCreateForm = true;

    if (this.profile) {
      this.formData = { ...this.profile };
    }
  }

  closeForm() {
    this.showCreateForm = false;
  }
}