import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;
  message: string | null = null; 
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      roleId: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const { userName, password, roleId } = this.registerForm.value;
      this.authService.register(userName, password, roleId).subscribe({
        next: (response: any) => {
          this.message = response; 
          this.router.navigate(['/login']); 
        },
        error: (error) => {
          this.message = error.error;
        }
      });
    }
  }
}
