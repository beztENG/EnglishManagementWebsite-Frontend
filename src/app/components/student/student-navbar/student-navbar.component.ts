import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


interface MenuItem {
  icon: string;
  label: string;
  href: string;
}

const menuItems: MenuItem[] = [
  { icon: '/assets/icons/dashboard.png', label: 'Dashboard', href: '/student/dashboard' },
  { icon: '/assets/icons/class.png', label: 'Classes-Register', href: '/student/class-register' },
  { icon: '/assets/icons/course.png', label: 'View-Score', href: '/student/view-score' },

];
  
@Component({
  selector: 'app-student-navbar',
  imports: [RouterModule, CommonModule],
  templateUrl: './student-navbar.component.html',
  styleUrl: './student-navbar.component.css'
})

export class StudentNavbarComponent {
  menuItems = menuItems;

  constructor(private router: Router) {}
}
