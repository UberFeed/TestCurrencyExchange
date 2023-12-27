import { Injectable, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CurrentExchangeRate {

    constructor(
        private http: HttpClient
    ) { }

    apiKey: string = "e13b84da86ec8d77f15acf0b";

    CurrentRate() {
        const url = `https://v6.exchangerate-api.com/v6/${this.apiKey}/latest/UAH`;

        try {
            return this.http.get(url).pipe(map((data: any) => {
                let conversionRates = data['conversion_rates'];
                const selectedCurrencies = ['USD', 'EUR', 'PLN', 'GBP'];

                // Выбираем нужную валюту
                const selectedConversionRates: { [key: string]: number } = {};
                selectedCurrencies.forEach(currency => {
                    selectedConversionRates[currency] = conversionRates[currency];
                });

                // Обратное отношение     
                const inverseConversionRates: { [key: string]: number } = {};
                Object.entries(selectedConversionRates).forEach(([currency, rate]) => {
                    inverseConversionRates[currency] = 1 / rate;
                });

                return inverseConversionRates;
            }));
        }
        catch (error) {
            console.error("Ошибка курса валют:", error);
            throw error;
        }

    }
}
