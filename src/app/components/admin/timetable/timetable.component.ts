import { Component } from '@angular/core';
import { TimetableService, ScheduleItem } from '../../../services/timetable.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ConfirmModalComponent } from '../../../sections/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  imports: [FormsModule, CommonModule, ConfirmModalComponent],
  styleUrls: ['./timetable.component.css'],
})
export class TimetableComponent {
  classId: string = '';
  schedule: ScheduleItem[] = [];
  showModal: boolean = false;
  showConfirmModal: boolean = false;
  modalType: 'create' | 'update' = 'create';
  deleteMessage: string = 'Are you sure you want to delete this timetable?';

  constructor(private timetableService: TimetableService) {}

  fetchTimetable() {
    this.timetableService.fetchTimetable(this.classId).subscribe(
      (data) => {
        this.schedule = data.schedule;
        alert('Timetable fetched successfully!');
      },
      (error) => {
        console.error('Error fetching timetable:', error);
        alert('Failed to fetch timetable. Please try again.'); 
      }
    );
  }

  openModal(type: 'create' | 'update') {
    this.modalType = type;
    this.schedule = type === 'update'
      ? this.schedule.slice()
      : Array.from({ length: 3 }, () => ({ date: '', startDate: '', endDate: '' }));
    this.showModal = true;
  }

  handleSubmit(event: Event) {
    event.preventDefault();

    const formattedSchedule: ScheduleItem[] = this.schedule.map(item => ({
      date: item.date,
      startDate: item.startDate,
      endDate: item.endDate
    })).filter(item => item.date && item.startDate && item.endDate);

    const newTimetable = {
      classId: this.classId,
      schedule: formattedSchedule
    };

    console.log('Submitting timetable:', newTimetable);

    const submitMethod = this.modalType === 'create' ? 'createTimetable' : 'updateTimetable';
    this.timetableService[submitMethod](this.classId, newTimetable.schedule).subscribe(
      () => {
        this.showModal = false;
        this.fetchTimetable();
        alert(`${this.modalType === 'create' ? 'Timetable created' : 'Timetable updated'} successfully!`); 
      },
      (error) => {
        console.error(`Error ${this.modalType === 'create' ? 'creating' : 'updating'} timetable:`, error);
        alert(`Failed to ${this.modalType === 'create' ? 'create' : 'update'} timetable. Please try again.`);
      }
    );
  }

  closeModal() {
    this.showModal = false;
  }

  addScheduleItem() {
    this.schedule.push({ date: '', startDate: '', endDate: '' });
  }

  openConfirmModal() {
    this.showConfirmModal = true;
  }

  closeConfirmModal() {
    this.showConfirmModal = false;
  }

  confirmDelete() {
    this.timetableService.deleteTimetable(this.classId).subscribe(
      () => {
        this.schedule = [];
        this.showConfirmModal = false;
        alert('Timetable deleted successfully!'); 
      },
      (error) => {
        console.error('Error deleting timetable:', error);
        let errorMessage = 'Failed to delete timetable due to an unknown error.';
        if (error.error && error.error.message) {
          errorMessage = error.error.message;
        }
        alert(errorMessage); 
      }
    );
  }
}