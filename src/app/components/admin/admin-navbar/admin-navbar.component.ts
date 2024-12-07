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
  { icon: '/assets/icons/dashboard.png', label: 'Dashboard', href: '/admin/dashboard' },
  { icon: '/assets/icons/student.png', label: 'Students', href: '/admin/students' },
  { icon: '/assets/icons/teacher.png', label: 'Teachers', href: '/admin/teachers' },
  { icon: '/assets/icons/class.png', label: 'Classes', href: '/admin/classes' },
  { icon: '/assets/icons/course.png', label: 'Register', href: '/admin/register' },
  { icon: '/assets/icons/timetable.png', label: 'Timetable', href: '/admin/timetable' },
  { icon: '/assets/icons/school.png', label: 'Register Class', href: '/admin/class-register' },
];
 
@Component({
  selector: 'app-admin-navbar',
  imports: [RouterModule, CommonModule],
  templateUrl: './admin-navbar.component.html',
  styleUrl: './admin-navbar.component.css'
})
export class AdminNavbarComponent {
  menuItems = menuItems;

  constructor(private router: Router) {}
}
