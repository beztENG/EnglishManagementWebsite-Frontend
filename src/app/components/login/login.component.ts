import { Component, HostListener  } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms'; // Import FormsModule

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
})
export class LoginComponent {
  loginForm: FormGroup;
  message: string = '';

  // Monkey behavior properties
  isTypingUsername = false;
  isTypingPassword = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onFocusUsername() {
    this.isTypingUsername = true;
    this.isTypingPassword = false;
  }

  onFocusPassword() {
    this.isTypingUsername = false;
    this.isTypingPassword = true;
  }

  onBlur() {
    this.isTypingUsername = false;
    this.isTypingPassword = false;
  }

  onLogin() {
    if (this.loginForm.invalid) {
      this.message = 'Please fill in all fields.';
      return;
    }

    const { userName, password } = this.loginForm.value;

    this.authService.login(userName, password).subscribe({
      next: (response) => {
        const token = response.token;
        const roleId = response.roleId;
        this.message = 'Login successful!';

        this.authService.storeToken(token);

        this.navigateBasedOnRole(roleId);
      },
      error: (err) => {
        console.error('Login error:', err);
        this.message =
          'Login failed: ' + (err.error.message || 'Unknown error occurred');
      },
    });
  }

  private navigateBasedOnRole(roleId: string) {
    switch (roleId) {
      case 'admin':
        this.router.navigate(['/admin']);
        break;
      case 'student':
        this.router.navigate(['/student']);
        break;
      case 'teacher':
        this.router.navigate(['/teacher']);
        break;
      default:
        this.message = 'Unknown role';
    }
  }
}
