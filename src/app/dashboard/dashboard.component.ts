import { Component } from '@angular/core';
import { SharedServiceService } from '../services/shared-service.service';
import { format } from 'date-fns';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Dialog } from '@angular/cdk/dialog';
import { DeleteComponent } from '../modals/delete/delete.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  isEmpty: boolean = false;

  toDay = new Date();

  activities: any = [];

  constructor(
    private shared: SharedServiceService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getActivity();
  }

  formatDate(date: any) {
    return format(new Date(date), 'dd MMMM yyyy');
  }

  checkActivities() {
    this.isEmpty = this.activities.length == 0 ? true : false;
  }

  getActivity() {
    this.shared.getDataActivity().subscribe((result) => {
      this.activities = result.data;

      this.checkActivities();
    });
  }

  addActivity() {
    this.shared
      .postDataActivity({
        title: 'New Activity',
        email: 'arissunandar399@gmail.com',
      })
      .subscribe(() => this.getActivity());
  }

  deleteActivity(data: any) {
    this.dialog
      .open(DeleteComponent, { data: { from: 'activity', data: data } })
      .afterClosed()
      .subscribe((result) => {
        if (result == 'deleted') {
          const promise = new Promise((resolve) => {
            resolve(this.getActivity());
          });

          promise.then(() =>
            this.dialog
              .open(DeleteComponent, {
                data: { from: 'activity', data: 'deleted' },
              })
              .afterClosed()
              .subscribe(() => {})
          );
        }
      });
  }

  editActivity(dataActivity: any) {
    localStorage.setItem('dataActivity', JSON.stringify(dataActivity));

    this.router.navigate(['activity']);
  }
}
