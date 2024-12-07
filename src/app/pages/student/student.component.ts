import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StudentNavbarComponent } from '../../components/student/student-navbar/student-navbar.component';
@Component({
  selector: 'app-student',
  imports: [RouterOutlet, StudentNavbarComponent],
  templateUrl: './student.component.html',
  styleUrl: './student.component.css'
})

export class StudentComponent {

} 
