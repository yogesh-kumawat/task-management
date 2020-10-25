import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ITask } from '../modal/task';
import { InputDialogComponent } from '../dialogs/input-dialog/input-dialog.component';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { Options } from 'sortablejs';

@Component({
  selector: 'task-list',
  styleUrls: [ './task-list.component.scss' ],
  templateUrl: './task-list.component.html'
})
export class TaskListComponent implements OnInit {
  @Input() tasks: Array<ITask>;

  sortableOptions: Options = {
    group: 'task-manager-group',
  };

  constructor(public dialogService: NgbModal) {
    // this.tasks = [];
  }

  ngOnInit() {
    this.tasks = this.tasks || [];
  }

  addTask() {
    const dialogObj = this.dialogService.open(
      InputDialogComponent,
      { backdrop: 'static' }
      );
    dialogObj.componentInstance.title = 'Add new card';
    dialogObj.componentInstance.save.subscribe((taskName) => {
      this.tasks.push({name: taskName});
    });

    // API call
    //  this.TaskListService.post(post).subscribe();
  }

  onDelete(taskToDelete) {
    const dialogObj = this.dialogService.open(
      ConfirmDialogComponent,
      { backdrop: 'static' }
      );
    dialogObj.componentInstance.title = 'Delete card';
    dialogObj.componentInstance.isDelete.subscribe((taskName) => {
      const index = this.tasks.indexOf(taskToDelete);
      this.tasks.splice(index, 1);
    });
  }
}
