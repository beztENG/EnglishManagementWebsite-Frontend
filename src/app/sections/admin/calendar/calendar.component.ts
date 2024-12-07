import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimetableService, ScheduleItem, Timetable } from '../../../services/timetable.service'; // Ensure correct import
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs'; // Import 'of' to handle errors

@Component({
  selector: 'app-calendar',
  imports: [CommonModule],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {
  currentDate: Date = new Date();
  daysInMonth: (number | null)[] = [];
  monthNames: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  events: { classId: string; startDate: string; endDate: string }[] = [];



  constructor(private timetableService: TimetableService) {
    this.updateDays();
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
    this.updateDays();
  }

  get currentMonthYear(): string {
    return `${this.monthNames[this.currentDate.getMonth()]} ${this.currentDate.getFullYear()}`;
  }

  selectedDay: number | null = null;

  onDayClick(day: number | null) {
    if (!day) return;
  
    this.selectedDay = day; 
  

    const month = this.currentDate.getMonth() + 1; 
    const year = this.currentDate.getFullYear();
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;
    const date = `${year}-${formattedMonth}-${formattedDay}`;
  
    this.timetableService.getClassesByDate(date).subscribe(
      (events) => {
        this.selectedDayEvents = events;
      },
      (error) => {
        console.error('Error fetching events:', error);
        this.selectedDayEvents = [];
      }
    );
  }
  
  

  selectedDayEvents: Array<{ classId: string; startDate: string; endDate: string }> = [];

  
  
  
}