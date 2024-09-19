import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../models/task.model';
import { Column } from '../../models/column.model';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() task!: Task;
  @Input() columnIndex!: number;
  @Input() columns!: Column[];

  @Output() taskDeleted = new EventEmitter<string>();

  editMode: boolean = false;
  editedTitle: string = '';
  editedDescription: string = '';
  editedAssigneeFullName = '';

  constructor(private storageService: StorageService) {}

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
    this.columns = this.storageService.deleteTask(this.columns, this.columnIndex, this.task.id);
    this.taskDeleted.emit(this.task.id);
  }

  saveColumns() {
    this.storageService.saveColumns(this.columns);
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