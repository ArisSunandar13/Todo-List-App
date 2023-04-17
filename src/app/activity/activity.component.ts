import { Component } from '@angular/core';
import { SharedServiceService } from '../services/shared-service.service';
import { MatDialog } from '@angular/material/dialog';
import { AddTodoComponent } from '../modals/add-todo/add-todo.component';
import { DeleteComponent } from '../modals/delete/delete.component';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css'],
})
export class ActivityComponent {
  isEmpty: boolean = false;

  isEditTitle: boolean = false;

  dataActivity: any = {};

  holdSort: string = 'terbaru';
  todoBeforeSort: any = [];
  dataTodo: any = [];

  colorTodo: any = [];

  isSort: any = {
    terbaru: true,
    terlama: false,
    az: false,
    za: false,
    belumSelesai: false,
  };

  constructor(
    private shared: SharedServiceService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    const getDataActivity: any = localStorage.getItem('dataActivity');
    this.dataActivity = JSON.parse(getDataActivity);

    this.getTodo();
  }

  cekTodo() {
    this.isEmpty = this.dataTodo.length == 0 ? true : false;
  }

  selectSort(select: string) {
    this.holdSort = select;
    const promise = new Promise((resolve) => {
      const setData: any = {};

      for (let prop in this.isSort) {
        if (prop == select) {
          this.isSort[prop] = true;
          setData[prop] = true;
        } else {
          this.isSort[prop] = false;
          setData[prop] = false;
        }
      }

      resolve(setData);
    });

    promise.then(() => {
      if (this.isSort.terbaru)
        this.dataTodo = this.todoBeforeSort.sort(
          (a: any, b: any) => a.id - b.id
        );
      else if (this.isSort.terlama)
        this.dataTodo = this.todoBeforeSort.sort(
          (a: any, b: any) => b.id - a.id
        );
      else if (this.isSort.az)
        this.dataTodo = this.todoBeforeSort.sort((a: any, b: any) =>
          a.title.localeCompare(b.title)
        );
      else if (this.isSort.za)
        this.dataTodo = this.todoBeforeSort.sort((a: any, b: any) =>
          b.title.localeCompare(a.title)
        );
      else if (this.isSort.belumSelesai)
        this.dataTodo = this.todoBeforeSort.sort(
          (a: any, b: any) => b.is_active - a.is_active
        );

      this.dataTodo.forEach((todo: any, index: number) => {
        switch (todo.priority) {
          case 'very-high':
            this.colorTodo[index] = 'red';
            break;
          case 'high':
            this.colorTodo[index] = 'yellow';
            break;
          case 'normal':
            this.colorTodo[index] = 'green';
            break;
          case 'low':
            this.colorTodo[index] = 'blue';
            break;
          case 'very-low':
            this.colorTodo[index] = 'purple';
            break;
        }
      });

      this.cekTodo();
    });
  }

  isActive(index: number) {
    let { id, is_active } = this.dataTodo[index];
    is_active = is_active == 1 ? true : false;

    this.shared
      .editDataTodo({ is_active: !is_active }, id)
      .subscribe(() => this.getTodo());
  }

  editTitleActivity() {
    if (this.isEditTitle) {
      this.isEditTitle = false;
    } else {
      this.isEditTitle = true;
    }

    this.shared.editDataActivity(this.dataActivity).subscribe(() => {
      localStorage.setItem('dataActivity', JSON.stringify(this.dataActivity));

      this.ngOnInit();
    });
  }

  getTodo() {
    this.shared.getDataTodo(this.dataActivity.id).subscribe((result) => {
      this.todoBeforeSort = result.data;

      this.selectSort(this.holdSort);
    });
  }

  addTodo() {
    this.dialog
      .open(AddTodoComponent, { data: { dataActivity: this.dataActivity } })
      .afterClosed()
      .subscribe(() => this.getTodo());
  }

  editTodo(data: any) {
    this.dialog
      .open(AddTodoComponent, {
        data: { dataTodo: data, dataActivity: this.dataActivity },
      })
      .afterClosed()
      .subscribe(() => this.getTodo());
  }

  deleteTodo(data: any) {
    this.dialog
      .open(DeleteComponent, { data: { from: 'todo', data: data } })
      .afterClosed()
      .subscribe((result) => {
        if (result == 'deleted') {
          const promise = new Promise((resolve) => {
            resolve(this.getTodo());
          });

          promise.then(() =>
            this.dialog
              .open(DeleteComponent, { data: { from: 'todo', data: result } })
              .afterClosed()
              .subscribe(() => {})
          );
        }
      });
  }
}
