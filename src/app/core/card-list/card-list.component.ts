import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TodoService } from './../../shared/todo.service';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css'],
})
export class CardListComponent implements OnInit {
  list: any;

  addListForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  constructor(private todoService: TodoService) {
    // this.list = this.todoService.getList();
    // console.log('this.list ', this.list);
    // console.log('this.getAllList() ', this.getAllList());
    this.list = this.getAllList();
  }

  ngOnInit(): void {}

  drop(event: CdkDragDrop<string[]>): void {
    console.log('ss', event);
    if (event.previousContainer === event.container) {
      // within list
      console.log('moveItemInArray1');
      moveItemInArray(
        event.container.data,
        // this.todos,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      console.log('transferArrayItem1');
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  getAllList(): any {
    // this.todoService.getList().subscribe((tasks) => (this.list = tasks));
    return this.todoService.getList();
  }

  addList(): void {
    const newList = this.addListForm.value;
    newList.tasks = [];
    console.log(newList);
    this.todoService.saveList(newList);
    this.addListForm.reset();
  }
}
