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

  dataTodoPost: any = {
    activity_group_id: this.data.id,
    title: '',
    priority: 'very-high',
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<AddTodoComponent>,
    private shared: SharedServiceService
  ) {
    if (data != null) this.dataTodoPost = data;
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
    const { id, title, priority } = this.dataTodoPost;

    if (this.data == null)
      this.shared
        .postDataTodo(this.dataTodoPost)
        .subscribe(() => this.dialogRef.close());
    else
      this.shared
        .editDataTodo({ title: title, priority: priority }, id)
        .subscribe(() => this.dialogRef.close());
  }
}
