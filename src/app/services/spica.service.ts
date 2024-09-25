import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Column } from '../models/column.model';
import { Task } from '../models/task.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpicaService {
  private baseUrl = environment.apiBaseUrl;
  private apiKey = environment.spicaApiKey;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.apiKey}`
    });
  }

  getAllColumns(): Observable<Column[]> {
    return this.http.get<Column[]>(`${this.baseUrl}/getAllColumns`, {
      headers: this.getHeaders()
    });
  }

  createColumn(column: Partial<Column>): Observable<Column> {
    return this.http.post<Column>(`${this.baseUrl}/createColumn`, column, {
      headers: this.getHeaders()
    });
  }

  updateColumn(column: Partial<Column>): Observable<Column> {
    return this.http.post<Column>(`${this.baseUrl}/updateColumn`, column, {
      headers: this.getHeaders()
    });
  }

  deleteColumn(columnId: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/deleteColumn`, { _id: columnId }, {
      headers: this.getHeaders()
    });
  }

  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseUrl}/getAllTasks`, {
      headers: this.getHeaders()
    });
  }

  getTaskById(taskId: string): Observable<Task> {
    return this.http.post<Task>(`${this.baseUrl}/getTaskById`, { _id: taskId }, {
      headers: this.getHeaders()
    });
  }

  createTask(task: Partial<Task>): Observable<Task> {
    return this.http.post<Task>(`${this.baseUrl}/createTask`, task, {
      headers: this.getHeaders()
    });
  }

  updateTask(task: Partial<Task>): Observable<Task> {
    return this.http.post<Task>(`${this.baseUrl}/updateTask`, task, {
      headers: this.getHeaders()
    });
  }

  deleteTask(taskId: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/deleteTask`, { _id: taskId }, {
      headers: this.getHeaders()
    });
  }
}
