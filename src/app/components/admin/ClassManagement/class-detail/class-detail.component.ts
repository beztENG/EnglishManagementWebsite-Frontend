import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassManagementService } from '../../../../services/classmanagement.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-class-detail',
  imports: [FormsModule, CommonModule],
  templateUrl: './class-detail.component.html',
  styleUrls: ['./class-detail.component.css']
})
export class ClassDetailComponent implements OnInit {
  classId: string | null = null;
  classDetails: any = null;
  updatedClass: any = {}; // to store updated class info

  constructor(
    private route: ActivatedRoute,
    private classManagementService: ClassManagementService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.classId = this.route.snapshot.paramMap.get('classId');
    if (this.classId) {
      this.fetchClassDetails(this.classId);
    }
  }

  fetchClassDetails(classId: string): void {
    this.classManagementService.viewClass(classId).subscribe({
      next: (data) => {
        this.classDetails = data;
        this.updatedClass = { ...data }; // Initialize the form with current class details
      },
      error: (err) => {
        this.toastr.error('Failed to fetch class details');
        console.error(err);
      },
    });
  }

  updateClass(): void {
    if (this.classId && this.updatedClass) {
      this.classManagementService.updateClass(this.classId, this.updatedClass).subscribe({
        next: (response) => {
          this.toastr.success('Class updated successfully');
          this.router.navigate(['/admin/class-supervision']); // Navigate to class supervision page after update
        },
        error: (err) => {
          this.toastr.error('Failed to update class');
          console.error(err);
        },
      });
    }
  }
}
