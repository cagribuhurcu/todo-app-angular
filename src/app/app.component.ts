import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Column } from './models/column.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Trello Todo App';
  newColumnTitle: string = '';
  columns: Column[] = [];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const savedColumns = localStorage.getItem('columns');
      if (savedColumns) {
        this.columns = JSON.parse(savedColumns);
      } else {
        this.columns = [
          {
            id: 'column-1',
            title: 'Yapılacaklar',
            tasks: [
              { id: 'task-1', title: 'Görev 1', description: '', assignee: { fullName: 'Ali' } },
              { id: 'task-2', title: 'Görev 2', description: '', assignee: { fullName: 'Ayşe' } }
            ]
          },
          {
            id: 'column-2',
            title: 'Yapılıyor',
            tasks: []
          },
          {
            id: 'column-3',
            title: 'Tamamlandı',
            tasks: []
          }         
        ];
      }
      console.log(this.columns);
    }
  }

  addColumn() {
    const newColumn: Column = {
      id: Math.random().toString(36).substr(2, 9),
      title: this.newColumnTitle,
      tasks: []
    };
    this.columns.push(newColumn);
    this.newColumnTitle = '';
    this.saveColumns();
  }

  saveColumns() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('columns', JSON.stringify(this.columns));
    }
  }

  updateColumn() {
    this.saveColumns();
  }
}