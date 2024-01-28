import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../../app.component';
import { CommonModule, JsonPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { HttpParams } from '@angular/common/http';
import { TodoSearchService } from '../../../Services/todo-search.service';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { TodoAddComponent } from '../todo-add/todo-add.component';
import { DashboardComponent } from "../../dashboard/dashboard.component";

@Component({
  selector: 'app-todos',
  standalone: true,
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
  imports: [JsonPipe, CommonModule, TodoItemComponent, TodoAddComponent, DashboardComponent]
})
export class TodosComponent implements OnInit {
  todos: any[] = [];
  filteredTodos: any[] = [];

  constructor(public httpApiService: AppComponent, private toastr: ToastrService, private searchService: TodoSearchService) { }

  async ngOnInit(): Promise<void> {
    await this.fetchTodos();

    this.searchService.search$.subscribe((searchTerm) => {
      this.filterTodos(searchTerm);
    });
  }

  async addTodo(todo: any): Promise<void> {
    await this.httpApiService.post('todo/add', todo).toPromise();
    await this.fetchTodos();
    this.toastr.success('Todo Added Successfully!!');
  }

  async updateTodo(todo: any): Promise<void> {
    const params = new HttpParams().set('Id', todo.id);
    await this.httpApiService.patch('todo/mark', null, params).toPromise();
    await this.fetchTodos();
    this.toastr.info('Todo Updated Successfully!!');
  }

  async deleteTodo(todo: any): Promise<void> {
    const params = new HttpParams().set('Id', todo.id);
    await this.httpApiService.delete('todo/delete', params).toPromise();
    const index = this.todos.findIndex(t => t.id === todo.Id);
    if (index !== -1) {
      this.todos.splice(index, 1);
      this.filteredTodos = [...this.todos];
    }
    this.toastr.warning('Todo Deleted Successfully!!');
    await this.fetchTodos();
  }


  private filterTodos(searchTerm: string): void {
    if (!searchTerm) {
      this.filteredTodos = [...this.todos];
    } else {
      this.filteredTodos = this.todos.filter((todo) =>
        todo.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  }

  private updateFilteredTodos(): void {
    const searchTerm = this.searchService.getSearchTerm();
    this.filterTodos(searchTerm);
  }

  private async fetchTodos(): Promise<void> {
    const data = await this.httpApiService.get<any>('todo/all').toPromise();
    this.todos = data;
    this.todos.sort((a, b) => (a.isDone === b.isDone) ? 0 : a.isDone ? 1 : -1);
    this.updateFilteredTodos();
  }
}
