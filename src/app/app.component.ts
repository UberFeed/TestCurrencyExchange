import { Component, OnInit } from '@angular/core';
import { CurrentExchangeRate } from '../app/services/CurrentExchangeRate.service';
import { ReverseCurrencyRate } from './Interfaces/ReverseCurrencyRate.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


    constructor(
        public CurrencyRate: CurrentExchangeRate
    ) { }

    title = 'TestCurrencyExchange';

    CurrentRate: ReverseCurrencyRate[] = [];

    ngOnInit() {
        this.CurrencyRate.currentRate().subscribe(
            (data: ReverseCurrencyRate[]) => {
                this.CurrentRate = data;
            }
        );
    }

    
}
