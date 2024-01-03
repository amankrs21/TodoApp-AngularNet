import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TodosComponent } from "./Components/todos/todos.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule, RouterOutlet, TodosComponent]
})
export class AppComponent {
  title = 'frontend';
  constructor() {
    setTimeout(() => {
      this.title = 'Change in Title';
    }, 3000);
  }
}
