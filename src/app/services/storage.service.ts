import { Injectable } from '@angular/core';
import { Column } from '../models/column.model';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  saveColumns(columns: Column[]): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('columns', JSON.stringify(columns));
    }
  }

  getColumns(): Column[] {
    if (typeof window !== 'undefined') {
      const savedColumns = localStorage.getItem('columns');
      return savedColumns ? JSON.parse(savedColumns) : [];
    }
    return [];
  }

  addColumn(columns: Column[], newColumn: Column): Column[] {
    columns.push(newColumn);
    this.saveColumns(columns);
    return columns;
  }

  deleteColumn(columns: Column[], columnIndex: number): Column[] {
    columns.splice(columnIndex, 1);
    this.saveColumns(columns);
    return columns;
  }

  updateColumns(columns: Column[]): void {
    this.saveColumns(columns);
  }

  deleteTask(columns: Column[], columnIndex: number, taskId: string): Column[] {
    columns[columnIndex].tasks = columns[columnIndex].tasks.filter(task => task.id !== taskId);
    this.saveColumns(columns);
    return columns;
  }
}
