import { ICachedResponse } from './app-database';

export class CachedResponse implements ICachedResponse {
  url: string;
  responseBody: any;
  lastModified: string;

  constructor(url: string, responseBody: any, lastModified: string) {
    this.url = url;
    this.responseBody = responseBody;
    this.lastModified = lastModified;
  }

}
