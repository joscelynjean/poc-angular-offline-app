import { TestBed } from '@angular/core/testing';

import { EmbeddedDatabaseService } from './embeddedDatabase.service';

describe('EmbeddedDatabaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmbeddedDatabaseService = TestBed.get(EmbeddedDatabaseService);
    expect(service).toBeTruthy();
  });
});
