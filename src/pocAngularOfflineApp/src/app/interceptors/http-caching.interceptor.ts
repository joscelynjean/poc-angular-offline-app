import { DexieService } from './../dexie/dexie.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError, from } from 'rxjs';
import { mergeMap, tap, catchError } from 'rxjs/operators';
import { ICachedResponse } from '../dexie/app-database';
import { resolve } from 'q';

@Injectable()
export class HttpCachingInterceptor implements HttpInterceptor {

  constructor(private dexieService: DexieService) { }

  // Create observable to get the data from the embedded database
  private getCachedResponse(url: string): Observable<ICachedResponse> {
    const cachedResponsePromise: Promise<ICachedResponse> = this.dexieService.db.cachedResponses.get(url);
    return from(cachedResponsePromise);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // Used to be accessible from the whole chain of observers
    let sharedCacheResponse: ICachedResponse = null;

    return this.getCachedResponse(req.url).pipe(
      // Modify request headers if there is already something in cache
      mergeMap((cachedResponse: ICachedResponse) => {

        // Keep reference so we do not have to fetch it again later
        sharedCacheResponse = cachedResponse;

        // If there is a response in cache, put the date in header so the api won't send the data again
        if (cachedResponse) {
          const headers = new HttpHeaders({
            'if-modified-since': cachedResponse.lastModified
          });

          // Update headers
          req = req.clone({ headers });
        }

        // Execute the request
        return next.handle(req).pipe(
          // Save the response in cache
          tap(event => {

            if (event instanceof HttpResponse) {
              const body = event.body;

              // Save everything in cache
              this.dexieService.db.cachedResponses.put({
                url: req.url,
                responseBody: body,
                lastModified: event.headers.get('last-modified')
              });
            }

          }),
          // If any error occurs and a response in cache is available, return it.
          catchError((err, caught) => {
            // Require better logic but for the example, on error, return value cached
            if (err instanceof HttpErrorResponse) {
              const response: HttpResponse<any> = new HttpResponse({
                status: 200,
                body: sharedCacheResponse.responseBody,
              });
              return of(response);
            }
            return throwError(err);

          })
        );
      })
    );
  }

}
