import { Component, Input } from '@angular/core';
import { Column } from '../../models/column.model';
import { Task } from '../../models/task.model';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})
export class ColumnComponent {
  @Input() column!: Column;
  @Input() columnIndex!: number;
  @Input() columns!: Column[];

  newTaskTitle: string = '';
  showInput: boolean = false;

  get columnIds(): string[] {
    return this.columns.map(col => col.id);
  }

  toggleInput() {
    this.showInput = !this.showInput;
  }

  addTask() {
    if (this.newTaskTitle.trim()) {
      const newTask: Task = {
        id: Math.random().toString(36).substr(2, 9),
        title: this.newTaskTitle
      };
      this.column.tasks.push(newTask);
      this.newTaskTitle = '';
      this.saveColumns();
    }
  }

  cancelAdd() {
    this.newTaskTitle = '';
    this.showInput = false;
  }

  deleteColumn() {
    this.columns.splice(this.columnIndex, 1);
    this.saveColumns();
  }

  saveColumns() {
    if (typeof window !== 'undefined') {
      localStorage.setItem('columns', JSON.stringify(this.columns));
    }
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(this.column.tasks, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    this.saveColumns();
  }
}
