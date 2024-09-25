import { Component, OnInit } from '@angular/core';
import { SpicaService } from './services/spica.service';
import { Column } from './models/column.model';
import { Task } from './models/task.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Trello Todo App';
  newColumnTitle: string = '';
  columns: Column[] = [];
  tasks: Task[] = [];

  constructor(private spicaService: SpicaService) {}

  ngOnInit() {
    this.loadColumnsAndTasks();
  }

  loadColumnsAndTasks() {
    this.spicaService.getAllColumns().subscribe(
      (columns: Column[]) => {
        this.columns = columns;
        this.spicaService.getAllTasks().subscribe(
          (tasks: Task[]) => {
            this.tasks = tasks;
            this.columns.forEach((column) => {
              column['tasks'] = this.tasks.filter(task => task.columnid === column._id);
            });
          },
          (error) => {
            console.error('Görevler alınırken bir hata oluştu:', error);
          }
        );
      },
      (error) => {
        console.error('Kolonlar alınamadı:', error);
      }
    );
  }

  addColumn() {
    if (!this.newColumnTitle.trim()) return;

    const newColumn: Partial<Column> = { title: this.newColumnTitle, taskids: [] };

    this.spicaService.createColumn(newColumn).subscribe(
      (data: Column) => {
        this.columns.push(data);
        this.newColumnTitle = '';
      },
      (error) => {
        console.error('Kolon eklenemedi:', error);
      }
    );
  }
}
