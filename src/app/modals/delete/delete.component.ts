import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SharedServiceService } from 'src/app/services/shared-service.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css'],
})
export class DeleteComponent {
  isInformation: boolean = false;

  dataDelete: any;
  isActivity: boolean = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) data: any,
    private shared: SharedServiceService,
    private dialogRef: MatDialogRef<DeleteComponent>
  ) {
    switch (data.from) {
      case 'activity':
        this.dataDelete = data.data;
        this.isActivity = true;

        this.isInformation = this.dataDelete == 'deleted' ? true : false;
        break;
      case 'todo':
        this.dataDelete = data.data;
        this.isActivity = false;

        this.isInformation = this.dataDelete == 'deleted' ? true : false;
        break;
    }
  }

  hapus() {
    this.isActivity
      ? this.shared.deleteDataActivity(this.dataDelete.id).subscribe(() => {
          this.dialogRef.close('deleted');
        })
      : this.shared.deleteDataTodo(this.dataDelete.id).subscribe(() => {
          this.dialogRef.close('deleted');
        });
  }
}
