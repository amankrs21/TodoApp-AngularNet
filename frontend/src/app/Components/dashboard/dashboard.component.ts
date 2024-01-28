import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoSearchService } from '../../Services/todo-search.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  search: string = '';
  constructor(private searchService: TodoSearchService) { }

  todoSearch() {
    this.searchService.setSearchTerm(this.search);
  }
}
