import { TestBed } from '@angular/core/testing';

import { TodoSearchService } from './todo-search.service';

describe('TodoSearchService', () => {
  let service: TodoSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
