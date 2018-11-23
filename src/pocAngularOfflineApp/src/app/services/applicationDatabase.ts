import Dexie from 'dexie';

// This class extends Dexie so we can initiate it, migrate version if required
// dans define our schema to use
export class ApplicationDatabase extends Dexie {
  cachedResponses: Dexie.Table<IHttpCacheResponse, String>;

  constructor() {
    console.log('Initialize database...');
    super('ApplicationDatabase');

    // This is where we can upgrade database from one version to another

    // Deine tables and indexes
    this.version(1).stores({
      cachedResponses: 'url, body, lastModified'
    });

    console.log('database initialization done...');
  }
}

export interface IHttpCacheResponse {
  url: string;
  body: any;
  lastModified: string;
}
