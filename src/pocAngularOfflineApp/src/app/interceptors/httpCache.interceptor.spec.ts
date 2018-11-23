import { TestBed } from '@angular/core/testing';

import { HttpCacheInterceptor } from './httpCache.interceptor';

describe('HttpCachingInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpCacheInterceptor = TestBed.get(HttpCacheInterceptor);
    expect(service).toBeTruthy();
  });
});
