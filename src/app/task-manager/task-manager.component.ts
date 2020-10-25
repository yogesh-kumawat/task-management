import { Component, OnInit } from '@angular/core';
import { ITaskList } from './modal/task-list';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InputDialogComponent } from './dialogs/input-dialog/input-dialog.component';
import { TaskListService } from './sevices/task-list.service';
import { ConfirmDialogComponent } from './dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'task-manager',
  styleUrls: [ './task-manager.component.scss' ],
  templateUrl: './task-manager.component.html'
})
export class TaskManagerComponent implements OnInit {
  taskLists: Array<ITaskList>;
  
  constructor( 
    public dialogService: NgbModal, 
    private taskListService: TaskListService 
  ) {
    this.taskLists = [];
    // this.taskLists = [
    //     {name: 'to do',
    //     tasks:[
    //         {
    //           name: 'pay bills'
    //         }
    //       ]
    //     }
    //   ];
  }
  
  public updateTaskListName(name, task) {
    const taskListToUpdate = Object.assign({}, task);
    taskListToUpdate.name = name;
    const index = this.taskLists.indexOf(task);
    this.taskLists[index].name = name;
  }

  ngOnInit() {
    // for demo, adding api calls here 
    // this.taskListService.get().subscribe( (taskLists) => {
    //   this.taskLists = taskLists;
    // });
    
  }

  addList() {
    const dialogObj = this.dialogService.open(
      InputDialogComponent,
      { backdrop: 'static' }
      );
    dialogObj.componentInstance.title = 'Add new list';
    dialogObj.componentInstance.save.subscribe((listName) => {
      this.taskLists.push({name: listName});
    });
  }

  onDeleteTask(taskToDelete) {
    const dialogObj = this.dialogService.open(
      ConfirmDialogComponent,
      { backdrop: 'static' }
      );
    dialogObj.componentInstance.title = 'Delete list';
    dialogObj.componentInstance.isDelete.subscribe((taskName) => {
      const index = this.taskLists.indexOf(taskToDelete);
      this.taskLists.splice(index, 1);
    });
  }
}
