import { Injectable, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CurrencyPair {

    constructor(
        private http: HttpClient
    ) { }

    apiKey: string = "e13b84da86ec8d77f15acf0b";

    CurrentPair(firstCurr: string, secondCurr: string, amount: number) {
        const url = `https://v6.exchangerate-api.com/v6/${this.apiKey}/pair/${firstCurr}/${secondCurr}/${amount}`;

        try {
            return this.http.get(url).pipe(map((data: any) => {
                let convert = data['conversion_result'];

                return convert;
            }));
        }
        catch (error) {
            console.error("Ошибка курса валют:", error);
            throw error;
        }

    }
}
