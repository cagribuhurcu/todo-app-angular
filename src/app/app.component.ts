import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Column } from './models/column.model';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Trello Todo App';
  newColumnTitle: string = '';
  columns: Column[] = [];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private storageService: StorageService
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.columns = this.storageService.getColumns();
    }
  }

  addColumn() {
    const newColumn: Column = {
      id: Math.random().toString(36).substr(2, 9),
      title: this.newColumnTitle,
      tasks: [],
    };
    this.columns = this.storageService.addColumn(this.columns, newColumn);
    this.newColumnTitle = '';
  }

  saveColumns() {
    this.storageService.saveColumns(this.columns);
  }

  updateColumn() {
    this.storageService.updateColumns(this.columns);
  }
}
