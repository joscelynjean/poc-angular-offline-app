import { DexieService } from './../dexie/dexie.service';
import { HockeyPlayer } from './../swagger-generated/model/hockeyPlayer';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { ICachedResponse } from '../dexie/app-database';

@Injectable()
export class HttpCachingInterceptor implements HttpInterceptor {

  constructor(private dexieService: DexieService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(`Request intercepted by caching interceptor. Path is '${req.url}'`);

    return next.handle(req).pipe(
      // Retrieve the value so we can save it to the database
      tap(event => {
        if (event instanceof HttpResponse) {
          const response = event.body;
          console.log(response);

          // Create new response to cache
          const newCachedResponse: ICachedResponse = {
            url: req.url,
            response: response,
            lastModified: new Date()
          };

          // Save to the database for later use
          this.dexieService.db.cachedResponses.put(newCachedResponse);
        }
        return event;
      }),
      catchError((err, caught) => {

        // Require better logic but for the example, on error, return value cached
        console.log('Error :', err);
        console.log('Caught :', caught);

        if (err instanceof HttpErrorResponse) {
          const response: HttpResponse<any> = new HttpResponse({
            status: 200,
            body: [
              { id: '130', firstname: 'Antti', lastname: 'Niemi' },
              { id: '111', firstname: 'Brendan', lastname: 'Gallagher' },
              { id: '127', firstname: 'Karl', lastname: 'Alzner' },
              { id: '126', firstname: 'Jeff', lastname: 'Petry' },
            ],
          });
          return of(response);
        }
        return throwError(err);

      })
    );

  }

}
