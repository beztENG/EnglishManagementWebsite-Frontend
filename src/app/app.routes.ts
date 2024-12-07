import { Routes } from '@angular/router';
import { RoleGuard } from './components/guard/role.guard';
import { AccessDeniedComponent } from './components/guard/access-denied.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent) },
  { 
    path: 'admin',
    loadComponent: () => import('./pages/admin/admin.component').then(m => m.AdminComponent),
    canActivate: [RoleGuard],
    data: { expectedRole: 'admin' },
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadComponent: () => import('./components/admin/dashboard/dashboard.component').then(m => m.DashboardComponent) },
      { path: 'students', loadComponent: () => import('./components/admin/students/students.component').then(m => m.StudentsComponent) },
      { path: 'students/profile/:code', loadComponent: () => import('./components/admin/profiles/profile-detail/profile-detail.component').then(m => m.ProfileDetailComponent) },
      { path: 'teachers', loadComponent: () => import('./components/admin/teachers/teachers.component').then(m => m.TeachersComponent) },
      { path: 'teachers/profile/:code', loadComponent: () => import('./components/admin/profiles/profile-detail/profile-detail.component').then(m => m.ProfileDetailComponent) },
      { path: 'classes', loadComponent: () => import('./components/admin/ClassManagement/classes/classes.component').then(m => m.ClassesComponent) },
      { path: 'class-management', loadComponent: () => import('./components/admin/ClassManagement/class-management/class-management.component').then(m => m.ClassManagementComponent) }, // Add this route
      { path: 'class-supervision', loadComponent:() => import('./components/admin/ClassManagement/class-supervision/class-supervision.component').then(m => m.ClassSupervisionComponent)},
      { path: 'course-supervision', loadComponent:() => import('./components/admin/ClassManagement/course-supervision/course-supervision.component').then(m => m.CourseSupervisionComponent)},
      { path: 'class-detail/:classId', loadComponent:() => import('./components/admin/ClassManagement/class-detail/class-detail.component').then(m => m.ClassDetailComponent)},
      { path: 'course-detail/:courseId', loadComponent:() => import('./components/admin/ClassManagement/course-detail/course-detail.component').then(m => m.CourseDetailComponent)},
      { path: 'profile-detail/:code', loadComponent:() => import('./components/admin/profiles/profile-detail/profile-detail.component').then(m => m.ProfileDetailComponent)},
      { path: 'timetable', loadComponent: () => import('./components/admin/timetable/timetable.component').then(m => m.TimetableComponent) },
      { path: 'register', loadComponent: () => import('./components/admin/register/register.component').then(m => m.RegisterComponent) },
      { path: 'class-register', loadComponent: () => import('./components/admin/class-register/class-register.component').then(m => m.ClassRegisterComponent) },
    ]
  },
  
  { 
    path: 'student', 
    loadComponent: () => import('./pages/student/student.component').then(m => m.StudentComponent), 
    canActivate: [RoleGuard], 
    data: { expectedRole: 'student' }, 
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadComponent: () => import('./components/student/dashboard/dashboard.component').then(m => m.DashboardComponent) },
      { path: 'class-register', loadComponent: () => import('./components/student/class-register/class-register.component').then(m => m.ClassRegisterComponent) },
      { path: 'view-score', loadComponent: () => import('./components/student/view-score/view-score.component').then(m => m.ViewScoreComponent) },
    ]
  },
  { 
    path: 'teacher', 
    loadComponent: () => import('./pages/teacher/teacher.component').then(m => m.TeacherComponent), 
    canActivate: [RoleGuard], 
    data: { expectedRole: 'teacher' }, 
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadComponent: () => import('./components/teacher/dashboard/dashboard.component').then(m => m.DashboardComponent) },
      { path: 'manage-score', loadComponent: () => import('./components/teacher/manage-score/manage-score.component').then(m => m.ManageScoreComponent) },
    ],
  },
  { path: 'access-denied', component: AccessDeniedComponent },
  { path: '**', redirectTo: 'login' },
];
