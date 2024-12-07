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
  { icon: '/assets/icons/dashboard.png', label: 'Dashboard', href: '/teacher/dashboard' },
  { icon: '/assets/icons/course.png', label: 'Manage-Score', href: '/teacher/manage-score' },

];
@Component({
  selector: 'app-teacher-navbar',
  imports: [RouterModule, CommonModule],
  templateUrl: './teacher-navbar.component.html',
  styleUrl: './teacher-navbar.component.css'
})
export class TeacherNavbarComponent {
  menuItems = menuItems;

  constructor(private router: Router) {}
}
