import { ICachedResponse } from './app-database';

export class CachedResponse implements ICachedResponse {
  url: string;
  response: any;
  lastModified: Date;

  constructor(url: string, response: any, lastModified: Date) {
    this.url = url;
    this.response = response;
    this.lastModified = lastModified;
  }

}
