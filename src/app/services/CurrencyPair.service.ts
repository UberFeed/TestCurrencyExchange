import { Injectable, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { CurrencyPairResponse } from '../Interfaces/CurrencyPairResponse.interface';

@Injectable({
    providedIn: 'root'
})
export class CurrencyPair {

    constructor(
        private http: HttpClient
    ) { }

    apiKey: string = "e13b84da86ec8d77f15acf0b";

    currentPair(firstCurr: string, secondCurr: string, amount: number): Observable<number> {
        const url = `https://v6.exchangerate-api.com/v6/${this.apiKey}/pair/${firstCurr}/${secondCurr}/${amount}`;

        return this.http.get<CurrencyPairResponse>(url).pipe(
            map(data => data.conversion_result),
            catchError((error) => {
                console.error("PairError:", error);
                return throwError(() => new Error(error));
            })
        );

    }
}
