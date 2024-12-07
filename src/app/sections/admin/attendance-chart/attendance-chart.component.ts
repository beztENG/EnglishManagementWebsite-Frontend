import { Component } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { registerables } from 'chart.js';
import { Chart } from 'chart.js/auto'; // Automatically registers all required components for charts

@Component({
  selector: 'app-attendance-chart',
  templateUrl: './attendance-chart.component.html',
  styleUrls: ['./attendance-chart.component.css'],
  standalone: true,
  imports: [BaseChartDirective],
})
export class AttendanceChartComponent {
  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55, 40],
        label: 'Attendance Rate',
        fill: true,
        tension: 0.4,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  public lineChartType: ChartType = 'line';

  constructor() {
    // Explicitly register required components for Chart.js
    Chart.register(...registerables);
  }
}
