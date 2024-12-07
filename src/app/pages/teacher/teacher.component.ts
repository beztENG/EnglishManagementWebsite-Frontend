import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TeacherNavbarComponent } from '../../components/teacher/teacher-navbar/teacher-navbar.component';
@Component({
  selector: 'app-teacher',
  imports: [RouterOutlet, TeacherNavbarComponent],
  templateUrl: './teacher.component.html',
  styleUrl: './teacher.component.css'
})
export class TeacherComponent {
 
}
