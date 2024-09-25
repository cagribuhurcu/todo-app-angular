import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../models/task.model';
import { Column } from '../../models/column.model';
import { SpicaService } from '../../services/spica.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() task!: Task;
  @Input() taskId!: string;
  @Input() columnIndex!: number;
  @Input() columns!: Column[];

  @Output() taskDeleted = new EventEmitter<string>();

  editMode: boolean = false;
  editedTitle: string = '';
  editedDescription: string = '';
  editedAssigneeFullName = '';

  constructor(private spicaService: SpicaService) {}

  enableEditMode() {
    this.editMode = true;
    this.editedTitle = this.task.title;
    this.editedDescription = this.task.description || '';
    this.editedAssigneeFullName = this.task.assigneefullname || '';
  }

  saveChanges() {
    const updatedTask: Partial<Task> = {
      _id: this.task._id,
      title: this.editedTitle,
      description: this.editedDescription,
      assigneefullname: this.editedAssigneeFullName,
      assigneeinitials: this.editedAssigneeFullName && this.editedAssigneeFullName.trim()
        ? this.getInitials(this.editedAssigneeFullName)
        : ''
    };

    this.spicaService.updateTask(updatedTask).subscribe(
      () => {
        this.task.title = this.editedTitle;
        this.task.description = this.editedDescription;
        this.task.assigneefullname = this.editedAssigneeFullName;
        this.task.assigneeinitials = this.getInitials(this.editedAssigneeFullName || '');
        this.editMode = false;
        console.log('Görev başarıyla güncellendi');
      },
      (error) => {
        console.error('Görev güncellenemedi', error);
      }
    );
  }

  cancelEdit() {
    this.editMode = false;
  }

  deleteTask() {
    this.spicaService.deleteTask(this.task._id).subscribe(
      () => {
        this.taskDeleted.emit(this.task._id);
        console.log('Görev başarıyla silindi');
      },
      (error) => {
        console.error('Görev silinemedi', error);
      }
    );
  }

  getInitials(fullName: string): string {
    if (!fullName) return '';
    const names = fullName.trim().split(' ');
    if (names.length === 1) {
      return names[0][0].toUpperCase();
    } else if (names.length >= 2) {
      return names[0][0].toUpperCase() + names[1][0].toUpperCase();
    }
    return '';
  }  
}
