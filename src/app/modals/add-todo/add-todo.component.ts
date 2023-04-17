import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SharedServiceService } from 'src/app/services/shared-service.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css'],
})
export class AddTodoComponent {
  isListItem: boolean = false;

  dataActivity: any = {};

  dataTodoPost: any = {
    activity_group_id: 0,
    title: '',
    priority: 'very-high',
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<AddTodoComponent>,
    private shared: SharedServiceService
  ) {
    if (data.dataTodo != null) this.dataTodoPost = data.dataTodo;

    this.dataTodoPost.activity_group_id = data.dataActivity.id;
  }

  ngOnInit() {
    this.cekListItem();
  }

  cekListItem() {
    this.isListItem = this.dataTodoPost.title.length == 0 ? false : true;
  }

  close() {
    this.dialogRef.close();
  }

  simpan() {
    const { id, title, priority, activity_group_id } = this.dataTodoPost;

    if (this.data.dataTodo == null)
      this.shared
        .postDataTodo({
          title: title,
          priority: priority,
          activity_group_id: activity_group_id,
        })
        .subscribe(() => this.dialogRef.close());
    else
      this.shared
        .editDataTodo({ title: title, priority: priority }, id)
        .subscribe(() => this.dialogRef.close());
  }
}
