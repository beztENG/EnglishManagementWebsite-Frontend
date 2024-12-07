import { Component, OnInit } from '@angular/core';
import { ScoreManagementService } from '../../../services/score-management.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TimetableService, ClassWithTimetable } from '../../../services/timetable.service';

@Component({
  selector: 'app-view-score',
  templateUrl: './view-score.component.html',
  imports: [FormsModule, CommonModule],
  styleUrls: ['./view-score.component.css']
})
export class ViewScoreComponent implements OnInit {
  studentId: string | undefined; // Store the student ID
  classesWithTimetables: ClassWithTimetable[] = []; // List of classes with timetables
  selectedClassId: string | undefined; // The selected class ID
  score: any; // Score data for the selected class
  showModal: boolean = false; // Toggle for the score modal

  constructor(
    private timetableService: TimetableService, // Use TimetableService
    private scoreManagementService: ScoreManagementService // For fetching scores
  ) {}

  ngOnInit(): void {
    this.studentId = localStorage.getItem('studentId')!;
    console.log(this.studentId)
    if (this.studentId) {
      // Fetch classes and timetables for the student
      this.timetableService.getStudentClassesAndTimetable(this.studentId).subscribe(
        (data: ClassWithTimetable[]) => {
          this.classesWithTimetables = data; // Populate the class and timetable data
        },
        (error) => {
          console.error('Error fetching classes and timetables:', error);
        }
      );
    }
  }

  // Handle the selection of a class and fetch the score
  onClassSelect(): void {
    if (this.selectedClassId && this.studentId) {
      this.scoreManagementService.getScore(this.selectedClassId, this.studentId).subscribe(
        (data) => {
          this.score = data; // Save the score data
          this.showModal = true; // Open the modal
        },
        (error) => {
          console.error('Error fetching score:', error);
        }
      );
    }
  }

  // Close the modal
  closeModal(): void {
    this.showModal = false;
  }
}
