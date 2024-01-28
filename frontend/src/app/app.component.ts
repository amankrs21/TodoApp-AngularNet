import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HttpClient, HttpClientModule, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TodosComponent } from './Components/Todo/todos/todos.component';
import { FormsModule } from '@angular/forms';
import { TodoSearchService } from './Services/todo-search.service';

@Component({
  standalone: true,
  selector: 'app-root',
  styleUrl: './app.component.css',
  templateUrl: './app.component.html',
  imports: [CommonModule, RouterOutlet, HttpClientModule, TodosComponent, CommonModule, RouterModule, FormsModule]
})
export class AppComponent {
  search: string = '';
  private baseUrl = 'https://localhost:7101';
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private searchService: TodoSearchService) { }

  private getFullUrl(url: string): string {
    return `${this.baseUrl}/${url}`;
  }

  get<T>(url: string): Observable<T> {
    const fullUrl = this.getFullUrl(url);
    return this.http.get<T>(fullUrl, { headers: this.headers, withCredentials: true });
  }

  post<T>(url: string, data: any): Observable<T> {
    const fullUrl = this.getFullUrl(url);
    return this.http.post<T>(fullUrl, data, { headers: this.headers, withCredentials: true });
  }

  patch<T>(url: string, data: any, params?: HttpParams): Observable<T> {
    const fullUrl = this.getFullUrl(url);
    const urlWithParams = params ? `${fullUrl}?${params.toString()}` : fullUrl;
    return this.http.patch<T>(urlWithParams, data, { headers: this.headers, withCredentials: true });
  }

  delete<T>(url: string, params?: HttpParams): Observable<T> {
    const fullUrl = this.getFullUrl(url);
    const urlWithParams = params ? `${fullUrl}?${params.toString()}` : fullUrl;
    return this.http.delete<T>(urlWithParams, { headers: this.headers, withCredentials: true });
  }

  todoSearch() {
    this.searchService.setSearchTerm(this.search);
  }
}
