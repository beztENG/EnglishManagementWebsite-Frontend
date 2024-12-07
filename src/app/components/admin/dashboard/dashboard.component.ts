import { Component, OnInit } from '@angular/core';
import { InfoCardComponent } from "../../../sections/admin/info-card/info-card.component";
import { CalendarComponent } from '../../../sections/admin/calendar/calendar.component';
import { AttendanceChartComponent } from '../../../sections/admin/attendance-chart/attendance-chart.component';
import { AuthService } from '../../../services/auth.service';
@Component({
  selector: 'app-dashboard',
  imports: [InfoCardComponent, CalendarComponent, AttendanceChartComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  studentCount: string = '0';
  teacherCount: string = '0';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getCountsByRole().subscribe(
      (data) => {
        this.studentCount = data.students.toString();
        this.teacherCount = data.teachers.toString();
      },
      (error) => {
        console.error('Error fetching counts:', error);
      }
    );
  }
}
