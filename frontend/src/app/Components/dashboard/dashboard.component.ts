import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoSearchService } from '../../Services/todo-search.service';
import { Router, RouterModule } from '@angular/router';
import { AppComponent } from '../../app.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  search: string = '';
  data: any = {};
  constructor(private searchService: TodoSearchService, private httpApiService: AppComponent, private router: Router, private toastr: ToastrService) { }

  todoSearch() {
    this.searchService.setSearchTerm(this.search);
  }

  async logout() {
    this.data = await this.httpApiService.get<any>('auth/logout').toPromise();
    this.toastr.success(this.data.message);
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
