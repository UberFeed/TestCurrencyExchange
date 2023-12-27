import { Component, OnInit } from '@angular/core';
import { CurrentExchangeRate } from '../app/services/CurrentExchangeRate.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    constructor(
        public CurrencyRate: CurrentExchangeRate
    ) { }

    CurrentRate: any;

    ngOnInit() {
        this.CurrencyRate.CurrentRate().subscribe(
            (data: any) => {
                this.CurrentRate = data;
                console.log(this.CurrentRate);
            }
        );
    }

    getObjectKeys(obj: any): any[] {
        if (obj != null) {
            return Object.keys(obj);
        }
        else {
            return [];
        }
    }

    title = 'TestCurrencyExchange';
}
