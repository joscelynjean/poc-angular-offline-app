import { TestBed } from '@angular/core/testing';

import { HttpCachingInterceptor } from './http-caching.interceptor';

describe('HttpCachingInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpCachingInterceptor = TestBed.get(HttpCachingInterceptor);
    expect(service).toBeTruthy();
  });
});
