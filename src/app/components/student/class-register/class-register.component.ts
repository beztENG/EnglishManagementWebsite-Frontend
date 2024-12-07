import { Component, OnInit } from '@angular/core';
import { ClassRegisterService } from '../../../services/class-register.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClassManagementService } from '../../../services/classmanagement.service';

@Component({
  selector: 'app-class-register',
  imports: [FormsModule, CommonModule],
  templateUrl: './class-register.component.html',
  styleUrl: './class-register.component.css'
})
export class ClassRegisterComponent implements OnInit {
  availableClasses: any[] = []; // List of all available classes
  registeredClasses: any[] = []; // List of student's registered classes

  constructor(
    private classRegisterService: ClassRegisterService,
    private classManagementService: ClassManagementService // To fetch available classes
  ) {}

  ngOnInit(): void {
    this.loadAvailableClasses();
    this.loadRegisteredClasses();
  }

  // Load available classes
  loadAvailableClasses(): void {
    this.classManagementService.getAllClasses().subscribe(
      (classes) => (this.availableClasses = classes),
      (error) => console.error('Error fetching available classes:', error)
    );
  }

  // Load registered classes
  loadRegisteredClasses(): void {
    const token = localStorage.getItem('authToken');
    const studentId = this.extractStudentIdFromToken(token); // Extract from JWT

    this.classRegisterService.getClassRegistrations(studentId).subscribe(
      (registrations) => (this.registeredClasses = registrations),
      (error) => console.error('Error fetching registered classes:', error)
    );
  }

  // Register for a class
  registerForClass(classId: string): void {
    this.classRegisterService.registerForClass(classId).subscribe(
      (response) => {
        alert(response);
        this.loadRegisteredClasses(); // Refresh registrations
      },
      (error) => console.error('Error registering for class:', error)
    );
  }

  // Cancel a registration
  cancelRegistration(classId: string): void {
    this.classRegisterService.cancelRegistration(classId).subscribe(
      (response) => {
        alert(response);
        this.loadRegisteredClasses(); // Refresh registrations
      },
      (error) => console.error('Error canceling registration:', error)
    );
  }

  // Extract studentId from JWT token
  private extractStudentIdFromToken(token: string | null): string {
    if (!token) {
      alert('You are not logged in!');
      return '';
    }
    const payload = JSON.parse(atob(token.split('.')[1])); // Decode JWT
    return payload.code; // Assuming 'code' is studentId
  }
}
