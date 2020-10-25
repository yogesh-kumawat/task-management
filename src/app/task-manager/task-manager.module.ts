import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
 
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SortablejsModule } from 'ngx-sortablejs';

import { InputDialogComponent } from './dialogs/input-dialog/input-dialog.component';
import { ConfirmDialogComponent } from './dialogs/confirm-dialog/confirm-dialog.component';

import { TaskManagerComponent } from './task-manager.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskListService } from './sevices/task-list.service';
import { EditInputComponent } from './edit-input/edit-input.component';
import { AutofocusDirective } from './directives/autofocus.directive';
 
@NgModule({
  declarations: [
    TaskManagerComponent,
    TaskListComponent,
    InputDialogComponent,
    ConfirmDialogComponent,
    EditInputComponent,
    AutofocusDirective
  ],
  exports: [EditInputComponent, TaskListComponent, TaskManagerComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, NgbModule, SortablejsModule],
  providers: [TaskListService]
})
export class TaskManagerModule {}
