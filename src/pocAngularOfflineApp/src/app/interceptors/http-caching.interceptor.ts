import { HockeyPlayer } from './../swagger-generated/model/hockeyPlayer';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Injectable()
export class HttpCachingInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Request intercepted by caching interceptor');

    // TODO: Add latest date of the data retrieved earlier to the request

    return next.handle(req).pipe(
      // This is a test where we change the response
      map(event => {

        // Case where we want to alter the response
        const activate = false;
        if (event instanceof HttpResponse && activate) {

          const hockeyPlayers: HockeyPlayer[] = [
            { id: '130', firstname: 'Antti', lastname: 'Niemi' },
            { id: '111', firstname: 'Brendan', lastname: 'Gallagher' },
            { id: '127', firstname: 'Karl', lastname: 'Alzner' },
            { id: '126', firstname: 'Jeff', lastname: 'Pettry' },
          ];

          return event.clone({
            body: hockeyPlayers
          });
        }

        return event;
      }),
      // Retrieve the value so we can save it to the database
      tap(event => {
        if (event instanceof HttpResponse) {
          const response = event.body;
          console.log(response);

          // TODO: Save data to the database for caching purpose
        }
        return event;
      })
    );
  }

  constructor() { }
}
