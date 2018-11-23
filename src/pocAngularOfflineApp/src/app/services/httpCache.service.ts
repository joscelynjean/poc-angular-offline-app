import { IHttpCacheResponse } from './applicationDatabase';
import { Injectable } from '@angular/core';
import { EmbeddedDatabaseService } from './embeddedDatabase.service';

@Injectable()
export class HttpCacheService {

  constructor(private ebdService: EmbeddedDatabaseService) { }

  getCacheResponse(url: string): Promise<IHttpCacheResponse> {
    return this.ebdService.db.cachedResponses.get(url);
  }

  putCacheResponse(responseToUpdate: IHttpCacheResponse): Promise<String> {
    return this.ebdService.db.cachedResponses.put(responseToUpdate);
  }

}
