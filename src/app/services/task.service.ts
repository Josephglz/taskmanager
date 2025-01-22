import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Task } from '../models/Task';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(
    private _http: HttpClient
  ) { }

  getTasks(): Observable<Task[]> {
    return this._http.get<Task[]>(`${environment.API_URL}/api/tasks`);
  }

  deleteTask(id: number): Observable<Task> {
    return this._http.delete<Task>(`${environment.API_URL}/api/tasks/${id}`);
  }

  createTask(task: Task): Observable<Task> {
    return this._http.post<Task>(`${environment.API_URL}/api/tasks`, task);
  }
}
