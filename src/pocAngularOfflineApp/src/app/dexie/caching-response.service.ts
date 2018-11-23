import { ApplicationDatabase, ICachedResponse } from './app-database';
import { Injectable } from '@angular/core';
import { DexieService } from './dexie.service';

@Injectable()
export class CachingResponseService {

  constructor(private dexieService: DexieService) { }

  addCacheResponse(responseToCache: ICachedResponse): Promise<String> {
    return this.dexieService.db.cachedResponses.add(responseToCache);
  }

  getCacheResponse(url: string): Promise<ICachedResponse> {
    return this.dexieService.db.cachedResponses.get(url);
  }

  updateCacheResponse(responseToUpdate: ICachedResponse): Promise<String> {
    return this.dexieService.db.cachedResponses.put(responseToUpdate);
  }

}
