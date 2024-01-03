import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../../Todo';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.css'
})
export class TodoItemComponent {
  @Input()
  todo: Todo = new Todo;

  @Output() todoDelete: EventEmitter<Todo> = new EventEmitter();

  deleteTodo() {
    this.todoDelete.emit(this.todo);
    console.log('Delete todo triggered');
  }
}
