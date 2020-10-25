import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITaskList } from '../modal/task-list';

const httpOptions = {
  headers: new HttpHeaders ({
    'Content-Type': 'application/json; charset=UTF-8',
  })
};

@Injectable()
export class TaskListService {
  // we define our url once get server
  public taskListUrl = '';

  constructor(
    private http: HttpClient,
  ) { }

  public get(): Observable<ITaskList[]> {
    return this.http.get<ITaskList[]>(`${this.taskListUrl}`);
  }

  public post(taskList: ITaskList): Observable<ITaskList> {
    return this.http.post<ITaskList>(this.taskListUrl, taskList, httpOptions);
  }

  public put(taskLists: ITaskList): Observable<ITaskList[]> {
    return this.http.put<ITaskList[]>(this.taskListUrl, taskLists, httpOptions);
  }

  public delete(taskList: ITaskList): Observable<ITaskList[]> {
    return this.http.delete<ITaskList[]>(
      `${this.taskListUrl}/${taskList._id}`,
      httpOptions,
    );
  }

}
