import { ApplicationDatabase } from './app-database';
import { Injectable } from '@angular/core';

@Injectable()
export class DexieService {

  db: ApplicationDatabase;

  constructor() {

    this.db = new ApplicationDatabase();
    this.db.open(); // Open the database

  }

}
