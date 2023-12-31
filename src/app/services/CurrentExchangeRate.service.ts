import { Injectable, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { CurrencyRate } from 'src/app/Interfaces/CurrencyRate.interface';
import { ReverseCurrencyRate } from 'src/app/Interfaces/ReverseCurrencyRate.interface';

@Injectable({
    providedIn: 'root'
})
export class CurrentExchangeRate {

    constructor(
        private http: HttpClient
    ) { }

    apiKey: string = "e13b84da86ec8d77f15acf0b";

    currentRate(): Observable<ReverseCurrencyRate[]> {
        const url = `https://v6.exchangerate-api.com/v6/${this.apiKey}/latest/UAH`;

        return this.http.get<CurrencyRate>(url).pipe(
            map((data: CurrencyRate) => this.processRates(data)),
            catchError(error => {
                console.error("ExchangeError:", error);
                return throwError(() => new Error(error));
            })
        );

    }

    processRates(data: CurrencyRate): ReverseCurrencyRate[] {
        let conversionRates = data.conversion_rates;
        const selectedCurrencies = ['USD', 'EUR', 'PLN', 'GBP'];

        const resultArray: ReverseCurrencyRate[] = [];

        selectedCurrencies.forEach(currency => {
            const rate = conversionRates[currency];
            const inverseRate = 1 / rate;
            resultArray.push({ currency, inverseRate });
        });

        return resultArray;
    }
}
