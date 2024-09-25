import { Component, Input, OnInit } from '@angular/core';
import { Column } from '../../models/column.model';
import { Task } from '../../models/task.model';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { SpicaService } from '../../services/spica.service';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
})
export class ColumnComponent implements OnInit {
  @Input() column!: Column;
  @Input() columnIndex!: number;
  @Input() columns!: Column[];
  tasks: Task[] = [];
  newTaskTitle: string = '';
  showInput: boolean = false;
  editMode: boolean = false;
  editedTitle: string = '';

  constructor(private spicaService: SpicaService) {}

  get columnIds(): string[] {
    return this.columns.map(col => col._id);
  }

  ngOnInit() {
    this.getTasksForColumn();
  }

  getTasksForColumn() {
    this.spicaService.getAllTasks().subscribe(
      (tasks: Task[]) => {
        this.tasks = tasks.filter(task => task.columnid === this.column._id);
      },
      (error) => {
        console.error('Görevler alınırken bir hata oluştu:', error);
      }
    );
  }

  toggleEdit() {
    this.editMode = true;
    this.editedTitle = this.column.title;
  }
  
  saveColumnTitle() {
    if (this.editedTitle.trim()) {
      const updatedColumn = { ...this.column, title: this.editedTitle };
      this.spicaService.updateColumn(updatedColumn).subscribe(
        () => {
          this.column.title = this.editedTitle;
          this.editMode = false;
        },
        (error) => {
          console.error('Kolon başlığı güncellenemedi', error);
        }
      );
    }
  }
  
  cancelEdit() {
    this.editMode = false;
  }

  onTaskDeleted(taskId: string) {
    this.tasks = this.tasks.filter(task => task._id !== taskId);
    console.log('Görev silindi:', taskId);
  }

  toggleInput() {
    this.showInput = !this.showInput;
  }

  addTask() {
    if (this.newTaskTitle.trim()) {
      const newTask: Partial<Task> = {
        title: this.newTaskTitle,
        columnid: this.column._id,
      };

      this.spicaService.createTask(newTask).subscribe(
        (task) => {
          this.tasks.push(task);
          this.column.taskids.push(task._id);
          this.newTaskTitle = '';
          this.toggleInput();
        },
        (error) => {
          console.error('Görev eklenemedi', error);
        }
      );
    }
  }

  cancelAdd() {
    this.newTaskTitle = '';
    this.showInput = false;
  }

  deleteColumn() {
    this.spicaService.deleteColumn(this.column._id).subscribe(
      () => {
        this.columns.splice(this.columnIndex, 1);
        console.log('Kolon silindi:', this.column._id);
      },
      (error) => {
        console.error('Kolon silinemedi', error);
      }
    );
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);
    } else {
      const task = event.previousContainer.data[event.previousIndex];
      task.columnid = this.column._id;

      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);

      this.spicaService.updateTask(task).subscribe(
        () => {
          console.log('Görev başarıyla güncellendi');
        },
        (error) => {
          console.error('Görev güncellenemedi', error);
        }
      );
    }
  }
}
