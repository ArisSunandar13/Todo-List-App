import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedServiceService {
  private url: string = 'https://todo.api.devcode.gethired.id/';
  private tableActivity: string = 'activity-groups/';
  private tableTodo: string = 'todo-items/';
  private email: string = '?email=arissunandar399@gmail.com';

  constructor(private http: HttpClient) {}

  // ACTIVITY
  getDataActivity(id: any = ''): Observable<any> {
    if (id.length == 0)
      return this.http
        .get(this.url + this.tableActivity + this.email)
        .pipe((result) => result);
    else
      return this.http
        .get(this.url + this.tableActivity + id)
        .pipe((result) => result);
  }

  postDataActivity(data: any) {
    return this.http
      .post(this.url + this.tableActivity, data)
      .pipe((result) => result);
  }

  deleteDataActivity(id: any) {
    return this.http
      .delete(this.url + this.tableActivity + id)
      .pipe((result) => result);
  }

  editDataActivity(data: any) {
    return this.http
      .patch(this.url + this.tableActivity + data.id, data)
      .pipe((result) => result);
  }

  // TODO
  getDataTodo(activityGroupId: any, id: any = ''): Observable<any> {
    return this.http
      .get(
        this.url + this.tableTodo + id + '?activity_group_id=' + activityGroupId
      )
      .pipe((result) => result);
  }

  postDataTodo(data: any) {
    return this.http
      .post(this.url + this.tableTodo, data)
      .pipe((result) => result);
  }

  deleteDataTodo(id: any) {
    return this.http
      .delete(this.url + this.tableTodo + id)
      .pipe((result) => result);
  }

  editDataTodo(data: any, id: any) {
    return this.http
      .patch(this.url + this.tableTodo + id, data)
      .pipe((result) => result);
  }
}
