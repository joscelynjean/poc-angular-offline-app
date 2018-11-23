import { IHttpCacheResponse } from '../../services/applicationDatabase';

export class HttpCacheResponse implements IHttpCacheResponse {
  url: string;
  body: any;
  lastModified: string;

  constructor(url: string, responseBody: any, lastModified: string) {
    this.url = url;
    this.body = responseBody;
    this.lastModified = lastModified;
  }

}
