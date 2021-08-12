import { TestBed } from '@angular/core/testing';

import { MemorandosService } from './memorandos.service';

describe('MemorandosService', () => {
  let service: MemorandosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MemorandosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
