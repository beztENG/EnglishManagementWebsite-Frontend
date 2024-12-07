import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScoreManagementService } from '../../../services/score-management.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TimetableService, Timetable } from '../../../services/timetable.service';
import { ProfileService } from '../../../services/profile.service';
import { Profile } from '../../interfaces/profile.model';

@Component({
  selector: 'app-manage-score',
  templateUrl: './manage-score.component.html',
  imports: [FormsModule, CommonModule], 
  styleUrls: ['./manage-score.component.css']
})
export class ManageScoreComponent implements OnInit {
  teacherId: string | undefined; // Teacher's ID from localStorage
  teacherClasses: Timetable[] = []; // List of timetables for teacher's classes
  selectedClassId: string | undefined; // Class ID selected by the teacher
  studentId: string = ''; // Student ID entered by the teacher
  score: any = null; // Score information for the selected student
  showScoreModal: boolean = false; // Modal visibility for score details

  constructor(
    private timetableService: TimetableService,
    private scoreManagementService: ScoreManagementService,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('authToken');
    if (token) {
      this.profileService.getProfile(token).subscribe(
        (profile: Profile) => {
          this.teacherId = profile.code; // Store the code
          localStorage.setItem('teacherId', this.teacherId); // Store in local storage
          console.log(this.teacherId)
          this.loadTeacherClasses(); // Fetch the classes after getting teacherId
        },
        (error) => {
          console.error('Error fetching profile:', error);
        }
      );
    } else {
      console.error('No token found. Please log in.');
    }
  }

  loadTeacherClasses(): void {
    if (this.teacherId) {
      this.timetableService.getTeacherSchedule(this.teacherId).subscribe(
        (data: Timetable[]) => {
          this.teacherClasses = data; // Store the classes
          console.log(this.teacherClasses); // Debugging log to see the classes
        },
        (error) => {
          console.error('Error fetching teacher schedule:', error);
        }
      );
    }
  }

  // Fetch the score for a specific student in a class
  getStudentScore(): void {
    if (this.selectedClassId && this.studentId) {
      this.scoreManagementService.getScore(this.selectedClassId, this.studentId).subscribe(
        (data) => {
          this.score = data; // Store the score details
          this.showScoreModal = true; // Show the score modal
        },
        (error) => {
          console.error('Error fetching student score:', error);
        }
      );
    } else {
      alert('Please select a class and enter a student ID.');
    }
  }

  // Close the score modal
  closeScoreModal(): void {
    this.showScoreModal = false;
  }

  // Create a new score for a student
  createStudentScore(): void {
    const token = `Bearer ${localStorage.getItem('authToken')}`; // Retrieve auth token
    if (this.selectedClassId && this.studentId) {
      this.scoreManagementService.createScore(this.selectedClassId, this.studentId, token).subscribe(
        () => {
          alert('Score created successfully!');
        },
        (error) => {
          console.error('Error creating score:', error);
        }
      );
    } else {
      alert('Please select a class and enter a student ID.');
    }
  }

  // Edit an existing score for a student
// Edit an existing score for a student
editStudentScore(midterm: string, finalExam: string): void {
  const midtermScore = Number(midterm); // Convert to number
  const finalExamScore = Number(finalExam); // Convert to number

  if (this.selectedClassId && this.studentId) {
    this.scoreManagementService.editScore(this.selectedClassId, this.studentId, midtermScore, finalExamScore).subscribe(
      () => {
        alert('Score updated successfully!');
        this.getStudentScore(); // Refresh the score after update
      },
      (error) => {
        console.error('Error updating score:', error);
      }
    );
  } else {
    alert('Please select a class and enter a student ID.');
  }
}
}
