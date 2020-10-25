import { HttpClient, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ITaskList } from '../modal/task-list';
import { TaskListService } from './task-list.service';

describe('TaskListService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let taskListService: TaskListService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TaskListService],
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    taskListService = TestBed.inject(TaskListService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('Be able to retrieve task lists from the api', () => {
    let mockTaskLists: ITaskList[];

    beforeEach(() => {
      taskListService = TestBed.inject(TaskListService);
      mockTaskLists = [
        {
          _id: '1',
          name: 'To do',
          tasks: [
            {
              _id: '1',
              name: 'task11',
            }
          ],
        },
        {
          _id: '2',
          name: 'Doing',
          tasks: [
            {
              _id: '21',
              name: 'task21',
            }
          ],
        },
      ] as ITaskList[];
    });
    it('should return expected task lists (called once)', () => {
      taskListService
        .get()
        .subscribe(
          (taskLists) =>
            expect(taskLists).toEqual(
              mockTaskLists,
              'should return expected task lists',
            ),
          fail,
        );

      const req = httpTestingController.expectOne(taskListService.taskListUrl);
      expect(req.request.method).toEqual('GET');

      req.flush(mockTaskLists);
    });

    it('should be OK returning no task lists', () => {
      taskListService.get().subscribe((taskLists) => {
        expect(taskLists.length).toEqual(
          0,
          'should have empty task lists array',
        );
      }, fail);

      const req = httpTestingController.expectOne(taskListService.taskListUrl);
      req.flush([]);
    });

  });

  describe('be able to delete task list', () => {
    it('should delete a task list', () => {
      const taskLists: ITaskList[] = [
        {
          _id: '1',
          name: 'Doing',
        },
        {
          _id: '2',
          name: 'Done',
        },
      ];

      taskListService.delete(taskLists[0]).subscribe((data) => {
        expect(data).toEqual([taskLists[1]], 'should return the task list');
      }, fail);

      const req = httpTestingController.expectOne(
        taskListService.taskListUrl + '/1',
      );
      expect(req.request.method).toEqual('DELETE');

      const expectedResponse = new HttpResponse({
        body: [taskLists[1]],
        status: 200,
        statusText: 'OK',
      });
      req.event(expectedResponse);
    });
  });
});
