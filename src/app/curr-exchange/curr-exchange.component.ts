import { Component, OnInit } from '@angular/core';
import { CurrencyPair } from '../services/CurrencyPair.service';
import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-curr-exchange',
  templateUrl: './curr-exchange.component.html',
  styleUrls: ['./curr-exchange.component.css']
})
export class CurrExchangeComponent implements OnInit {

    inputValue1: number = 0;
    inputValue2: number = 0;
    selectedOption1: string = 'USD';
    selectedOption2: string = 'UAH';

    private searchInput1Changed = new Subject<number>();
    private searchInput2Changed = new Subject<number>();

    constructor(
        public CurrPair: CurrencyPair
    ) { }

    ngOnInit() {
        this.searchInput1Changed.pipe(debounceTime(1000)).subscribe(() => {
            this.CurrencyPair();
        });

        this.searchInput2Changed.pipe(debounceTime(1000)).subscribe(() => {
            this.CurrencyRevertPair();
        });
    }

    onSearchValue1Change() {
        this.searchInput1Changed.next(this.inputValue1);
    }

    onSearchValue2Change() {
        this.searchInput2Changed.next(this.inputValue2);
    }

    CurrencyPair() {
        if (this.inputValue1 != 0) {
            this.CurrPair.CurrentPair(this.selectedOption1, this.selectedOption2, this.inputValue1).subscribe(
                (data: any) => {
                    this.inputValue2 = Math.round(data * 100) / 100;
                }
            );
        }
    }

    CurrencyRevertPair() {
        if (this.inputValue1 != 0) {
            this.CurrPair.CurrentPair(this.selectedOption2, this.selectedOption1, this.inputValue2).subscribe(
                (data: any) => {
                    this.inputValue1 = Math.round(data * 100) / 100;
                }
            );
        }
    }

    CheckSymbol(event: any) {
        const allowedKeys = ['Backspace', 'Tab', 'Enter', 'ArrowLeft', 'ArrowRight', 'Delete'];
        if (allowedKeys || /^[0-9]$/.test(event.key)) {
            this.inputValue1 = event.target.value.replace(/[^0-9.]/g, '');
        } else {
            event.preventDefault();
        }
    }
}
