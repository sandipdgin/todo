import { Component, OnInit, Input } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TodoService } from 'src/app/shared/todo.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  // todo = ['Get to work', 'Go home', 'Fall asleep'];
  // inProgress = ['Pick up groceries', 'Watch movie'];
  // done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];
  @Input() todos: any;
  @Input() listId: any;
  @Input() title: any;

  isEditTodo = false;

  addTodoForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
  });

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    // console.log('todos = ', this.todos);
    // console.log('todos = ', this.todos);
  }

  drop(event: CdkDragDrop<string[]>): void {
    // console.log('ss', event);
    if (event.previousContainer === event.container) {
      // within list
      console.log(
        'moveItemInArray'
        // event.container.data,
        // event.previousIndex,
        // event.currentIndex
      );
      // moveItemInArray(
      //   // event.container.data,
      //   this.todos,
      //   event.previousIndex,
      //   event.currentIndex
      // );
    } else {
      // console.log(
      //   'transferArrayItem ',
      //   event.previousContainer.data,
      //   event.container.data,
      //   event.previousIndex,
      //   event.currentIndex
      // );
      // transferArrayItem(
      //   event.previousContainer.data,
      //   event.container.data,
      //   event.previousIndex,
      //   event.currentIndex
      // );
    }
  }

  identify(index, item) {
    return item.name;
  }

  addTodo(id): void {
    const newTodo = this.addTodoForm.value;
    if (newTodo.title != '') {
      newTodo.groupId = id;
      this.todoService.addTodo(newTodo);
      // console.log('addtodo', newTodo);
    }
  }

  editTodo(i): void {
    // console.log('deletetodo', i);
    this.isEditTodo = true;
  }

  updateTodo(input, gid, id): void {
    // console.log('updateTodo', input.value);
    // console.log('updateTodo in', id);
    this.todoService.updateTodo(input.value, gid, id);
    this.isEditTodo = false;
  }

  deleteTodo(listId, id): void {
    let r = confirm('Are sure you want to delete this?');
    if (r == true) {
      console.log('you press ok');
      this.todoService.deleteTodo(listId, id);
    } else {
      console.log('you press cancel');
      return;
    }
    // console.log('deletetodo', id);
  }

  onAddCardClick(): void {}
}
