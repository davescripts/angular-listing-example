import { Injectable } from '@angular/core';

import { Quote } from './quote';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {

  private quotesUrl = 'https://raw.githubusercontent.com/davescripts/test-data/master/quotes.json';

  constructor(private http: HttpClient) { }

  getQuotes(): Observable<Quote[]> {
    return this.http.get<Quote[]>(this.quotesUrl)
      .pipe(
        catchError(this.handleError<Quote[]>('getQuotes', []))
      );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

}
