import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProfileService } from '../../../services/profile.service';
import { TimetableService, Timetable } from '../../../services/timetable.service';
import { Profile } from '../../interfaces/profile.model';

@Component({
  selector: 'app-dashboard',
  imports: [FormsModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentDate: Date = new Date();
  daysInMonth: (number | null)[] = [];
  selectedDay: number | null = null;
  events: { classId: string; startDate: string; endDate: string }[] = [];
  profile: Profile | null = null; // Profile data
  showCreateForm = false; // Whether to display the create profile form
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
  teacherTimetable: Timetable[] = []; // Store fetched timetable data

  monthNames: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  constructor(private profileService: ProfileService, private timetableService: TimetableService) {
    this.updateDays();
  }

  ngOnInit(): void {
    this.fetchProfile(); // Fetch profile data on initialization
  }

  // Update days in the current month
  updateDays() {
    const month = this.currentDate.getMonth();
    const year = this.currentDate.getFullYear();
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    const leadingDays: (number | null)[] = Array(firstDay).fill(null);
    const monthDays: (number | null)[] = Array.from({ length: lastDate }, (_, i) => i + 1);

    this.daysInMonth = leadingDays.concat(monthDays);
  }

  // Navigate months
  changeMonth(direction: number) {
    this.currentDate.setMonth(this.currentDate.getMonth() + direction);
    this.selectedDay = null; // Reset selected day on month change
    this.updateDays();
  }

  // Get current month and year
  get currentMonthYear(): string {
    return `${this.monthNames[this.currentDate.getMonth()]} ${this.currentDate.getFullYear()}`;
  }

  // Handle day click
  onDayClick(day: number | null) {
    if (!day) return;
    this.selectedDay = day;
    this.fetchEventsForDate();
  }

  // Fetch events for selected date
  fetchEventsForDate() {
    const selectedDate = `${this.currentDate.getFullYear()}-${this.currentDate.getMonth() + 1}-${this.selectedDay}`;
    
    this.events = this.teacherTimetable
      .flatMap(timetable => 
        timetable.schedule
          .filter(schedule => schedule.date === selectedDate)
          .map(schedule => ({
            classId: timetable.classId,
            startDate: schedule.startDate,
            endDate: schedule.endDate,
          }))
      );

    // Optionally, handle case when no events are found
    if (this.events.length === 0) {
      this.events.push({ classId: 'N/A', startDate: 'No events', endDate: '' });
    }
  }

  // Fetch teacher schedule using the code from the profile
  fetchTeacherSchedule() {
    if (this.profile && this.profile.code) {
      const teacherId = this.profile.code; // Use the code from the profile as teacherId
      this.timetableService.getTeacherSchedule(teacherId).subscribe({
        next: (data: Timetable[]) => {
          this.teacherTimetable = data;
        },
        error: () => {
          console.error('Error fetching teacher schedule');
        },
      });
    }
  }

  // Fetch profile data
  fetchProfile() {
    const token = localStorage.getItem('authToken');
    if (!token) return;

    this.profileService.getProfile(token).subscribe({
      next: (data: Profile) => {
        this.profile = data;
        this.fetchTeacherSchedule(); // Fetch the timetable after the profile is loaded
      },
      error: () => {
        this.profile = null; // Reset profile if not found
      },
    });
  }

  // Save profile (create or update)
  saveProfile() {
    const token = localStorage.getItem('authToken');
    if (!token) return;

    const request$ = this.profile
      ? this.profileService.updateProfile(this.formData, token)
      : this.profileService.createProfile(this.formData, token);

    request$.subscribe({
      next: (data: Profile) => {
        this.profile = data; // Update profile with the new data
        this.showCreateForm = false; // Close the form
      },
      error: (err) => {
        console.error('Error saving profile:', err);
      },
    });
  }

  // Open the form
  openForm() {
    this.showCreateForm = true;

    // Pre-fill form if updating an existing profile
    if (this.profile) {
      this.formData = { ...this.profile };
    }
  }

  // Close the form without saving
  closeForm() {
    this.showCreateForm = false;
  }
}