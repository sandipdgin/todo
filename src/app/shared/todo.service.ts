import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Todo } from './../model/todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  lists: any;
  listData: BehaviorSubject<Todo[]>;

  // var elementPos = array.map(function(x) {return x.id; }).indexOf(idYourAreLookingFor);

  constructor() {
    this.lists = [
      {
        name: 'To do',
        tasks: [
          { title: 'Get to work' },
          { title: 'Go home' },
          { title: 'Fall asleep' },
        ],
      },
      {
        name: 'In Progress',
        tasks: [{ title: 'Pick up groceries' }, { title: 'Watch movie' }],
      },
      {
        name: 'Done',
        tasks: [
          { title: 'Get up' },
          { title: 'Brush teeth' },
          { title: 'Take a shower' },
          { title: 'Check e-mail' },
          { title: 'Walk dog' },
        ],
      },
    ];
    // if (localStorage.getItem('lists') === null) {
    //   localStorage.setItem('lists', JSON.stringify(this.lists));
    // }
    this.addIdsToObject(this.lists);
    this.listData = new BehaviorSubject(this.lists);
  }

  addIdsToObject(obj): void {
    if (obj) {
      this.lists.forEach((element, index, array) => {
        element.id = index;

        if (element.tasks) {
          element.tasks.forEach((ele, ind, arr) => {
            ele.todoId = ind;
            ele.groupId = index;
          });
        }
      });
    }
  }

  getList(): BehaviorSubject<Todo[]> {
    // console.log('ser list ', this.lists);
    return this.lists;
  }

  saveList(list: Todo): void {
    // console.log('show list =', this.lists.length);
    list.id = this.lists.length;
    this.lists.push(list);
    // console.log('show list =', this.lists);
    this.listData.next(this.lists);
  }

  deletList(list: Todo): void {
    // console.log('delete list =');
  }

  addTodo(todo): void {
    // let newTodo = todo;
    todo.todoId = this.lists[todo.groupId].tasks.length;
    this.lists[todo.groupId].tasks.push(todo);
    this.listData.next(this.lists);
  }

  updateTodo(value, gid, id): void {
    // console.log(this.lists[gid].tasks[id]);
    this.lists[gid].tasks[id].title = value;
    // console.log('update todo =', this.lists);
    this.listData.next(this.lists);
  }

  deleteTodo(listId, id): void {
    this.lists[listId].tasks.splice(id, 1);
    this.listData.next(this.lists);
  }
}
