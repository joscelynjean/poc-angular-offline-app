import Dexie from 'dexie';

export class ApplicationDatabase extends Dexie {
  cachedResponses: Dexie.Table<ICachedResponse, String>;

  constructor() {
    console.log('Initialize database...');
    super('ApplicationDatabase');

    // This is where we can upgrade database from one version to another

    // Deine tables and indexes
    this.version(1).stores({
      cachedResponses: 'url, response, lastModified'
    });

    console.log('database initialization done...');
  }
}

export interface ICachedResponse {
  url: string;
  response: any;
  lastModified: Date;
}
