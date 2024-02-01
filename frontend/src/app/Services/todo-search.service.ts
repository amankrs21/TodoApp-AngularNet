import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoSearchService {

  private searchSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public search$: Observable<string> = this.searchSubject.asObservable();

  setSearchTerm(term: string): void {
    this.searchSubject.next(term);
  }

  getSearchTerm(): string {
    return this.searchSubject.value;
  }
}

