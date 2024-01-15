import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-todo-add',
  styleUrl: './todo-add.component.css',
  templateUrl: './todo-add.component.html',
  imports: [CommonModule, ReactiveFormsModule]
})
export class TodoAddComponent {
  @Output() todoAdd: EventEmitter<any> = new EventEmitter();

  submitted = false;
  todoForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.todoForm = this.formBuilder.group({
      title: ['', Validators.required],
      desc: ['', Validators.required]
    });
  }

  onSubmit = () => {
    this.submitted = true;
    if (this.todoForm.invalid) {
      return;
    }
    const todo = {
      Title: this.todoForm.value.title,
      Description: this.todoForm.value.desc,
    }
    this.submitted = false;
    this.todoAdd.emit(todo);
    this.todoForm.reset();
  }
}
