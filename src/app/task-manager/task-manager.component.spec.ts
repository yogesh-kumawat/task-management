import {
  async,
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick
} from '@angular/core/testing';
import {
  NgbModal,
  NgbModalOptions,
  NgbModule
} from '@ng-bootstrap/ng-bootstrap';
import { defer, Observable } from 'rxjs';

import { ITaskList } from './modal/task-list';
import { TaskListService } from './sevices/task-list.service';
import { TaskManagerComponent } from './task-manager.component';

class MockTaskListService {
  public taskLists: ITaskList[] = [];
  public get(): Observable<ITaskList[]> {
    return defer(() => Promise.resolve(this.taskLists));
  }
}

class MockDialogService {
  public open(content: any, options?: NgbModalOptions) {
    return {
      componentInstance: {
        isDelete: {
          subscribe: (cb) => {
            cb.call(null, true);
          }
        },
        save: {
          subscribe: (cb) => {
            cb.call(null, 'card1');
          }
        },
        title: 'card title'
      }
    };
  }
}

describe('TaskManagerComponent', () => {
  let component: TaskManagerComponent;
  let taskListService: TaskListService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TaskManagerComponent,
        { provide: TaskListService, useClass: MockTaskListService }
      ]
    });
    // inject both the component and the dependent service.
    component = TestBed.inject(TaskManagerComponent);
    taskListService = TestBed.inject(TaskListService);
  });

  it('should create the Task Planner component', () => {
    expect(component).toBeTruthy();
  });

  it('should create empty task lists', () => {
    expect(component.taskLists).not.toBeUndefined();
  });

  it('should return taskLists on ngOnInit()', () => {
    component.ngOnInit();
    // test case for mock service
    taskListService
      .get()
      .subscribe(
        (taskLists) =>
          expect(component.taskLists).toEqual(
            taskLists,
            'should return expected task lists'
          ),
        fail
      );
    expect(component.taskLists.length).toEqual(0);
  });
});

describe('TaskManagerComponent AddList and DeleteList', () => {
  let component: TaskManagerComponent;
  let fixture: ComponentFixture<TaskManagerComponent>;
  let dialog: MockDialogService;
  let taskListService: TaskListService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TaskManagerComponent],
      imports: [NgbModule],
      providers: [
        TaskManagerComponent,
        { provide: TaskListService, useClass: MockTaskListService },
        { provide: NgbModal, useClass: MockDialogService }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(TaskManagerComponent);
    dialog = TestBed.inject(NgbModal);
    taskListService = TestBed.inject(TaskListService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should add new task list', fakeAsync(() => {
    const addListButton: HTMLButtonElement = fixture.debugElement.nativeElement.querySelector(
      '#tasklist-add-button'
    );
    const taskLists = [{ name: 'card1' }];
    component.taskLists = taskLists;

    addListButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    tick(50);
    expect(component.taskLists).toEqual(
      taskLists,
      'should return expected taskLists'
    );
  }));

  it('should delete task list', fakeAsync(() => {
    const taskLists = [{ _id: '1', name: 'card1' }];
    component.taskLists = taskLists;
    fixture.detectChanges();
    const deleteListButton: HTMLButtonElement = fixture.debugElement.nativeElement.querySelector(
      '.delete-icon'
    );
    expect(component.taskLists.length).toBe(1);
    deleteListButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    tick(50);
    expect(component.taskLists.length).toBe(0);
  }));
});
