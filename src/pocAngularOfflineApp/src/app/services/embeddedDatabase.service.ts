import { ApplicationDatabase } from './applicationDatabase';
import { Injectable } from '@angular/core';

// Service which provide our single instance of the embedded database.
@Injectable()
export class EmbeddedDatabaseService {

  db: ApplicationDatabase;

  constructor() {

    this.db = new ApplicationDatabase();
    this.db.open(); // Open the database

  }

}
