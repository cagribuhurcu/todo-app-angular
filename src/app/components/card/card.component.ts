import { Component, Input } from '@angular/core';
import { Task } from '../../models/task.model';
import { Column } from '../../models/column.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() task!: Task;
  @Input() columnIndex!: number;
  @Input() columns!: Column[];

  editMode: boolean = false;
  editedTitle: string = '';
  editedDescription: string = '';
  editedAssigneeFullName = '';

  enableEditMode() {
    this.editMode = true;
    this.editedTitle = this.task.title;
    this.editedDescription = this.task.description || '';
    this.editedAssigneeFullName = this.task.assignee?.fullName || '';
  }

  saveChanges() {
    this.task.title = this.editedTitle;
    this.task.description = this.editedDescription;
    
    if (this.editedAssigneeFullName.trim()) {
      this.task.assignee = {
        fullName: this.editedAssigneeFullName,
        initials: this.getInitials(this.editedAssigneeFullName)
      };
    } else {
      this.task.assignee = null;
    }

    this.editMode = false;
    this.saveColumns();
  }

  cancelEdit() {
    this.editMode = false;
  }

  deleteTask() {
    this.columns[this.columnIndex].tasks = this.columns[this.columnIndex].tasks.filter(t => t !== this.task);
    this.saveColumns();
  }

  saveColumns() {
    if (typeof window !== 'undefined') {
      localStorage.setItem('columns', JSON.stringify(this.columns));
    }
  }

  getInitials(fullName: string): string {
    const names = fullName.trim().split(' ');
    if (names.length === 1) {
      return names[0][0].toUpperCase();
    } else if (names.length >= 2) {
      return names[0][0].toUpperCase() + names[1][0].toUpperCase();
    }
    return '';
  }
}