import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-todo-item',
  styleUrl: './todo-item.component.css',
  templateUrl: './todo-item.component.html',
  imports: [CommonModule]
})
export class TodoItemComponent {
  @Input() todo: any;
  @Output() todoUpdate: EventEmitter<any> = new EventEmitter();
  @Output() todoDelete: EventEmitter<any> = new EventEmitter();

  onUpdate(){
    this.todoUpdate.emit(this.todo);
  }

  onDelete(){
    this.todoDelete.emit(this.todo);
  }
}
