import { Component, OnInit, Output } from '@angular/core';
import { CurrencyPair } from '../services/CurrencyPair.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-curr-exchange',
  templateUrl: './curr-exchange.component.html',
  styleUrls: ['./curr-exchange.component.css']
})
export class CurrExchangeComponent implements OnInit {

    currencies: string[] = ['USD', 'EUR', 'GBP', 'JPY', 'UAH']; 
    convertedAmount: number = 0;
    converterForm!: FormGroup;

    constructor(
        private fb: FormBuilder,
        private CurrPair: CurrencyPair,
    ) { }

    ngOnInit() {
        this.converterForm = this.fb.group({
            amount1: [1, [Validators.required, Validators.pattern(/^\d*\.?\d*$/)]],
            currency1: ['USD', Validators.required],
            amount2: [0, [Validators.required, Validators.pattern(/^\d*\.?\d*$/)]],
            currency2: ['UAH', Validators.required],
        });

        this.convertCurrency('from');
    }

    convertCurrency(direction: 'from' | 'to') {
        const amount: number = direction === 'from' ? this.converterForm.get('amount1')!.value : this.converterForm.get('amount2')!.value;
        const fromCurrency: string = direction === 'from' ? this.converterForm.get('currency1')!.value : this.converterForm.get('currency2')!.value;
        const toCurrency: string = direction === 'from' ? this.converterForm.get('currency2')!.value : this.converterForm.get('currency1')!.value;

        if (!isNaN(amount)) {
            this.CurrPair.currentPair(fromCurrency, toCurrency, amount).subscribe(
                convertedAmount => {
                    if (direction === 'from') {
                        this.converterForm.get('amount2')?.setValue(Math.round(convertedAmount * 100) / 100);
                    }
                    else {
                        this.converterForm.get('amount1')?.setValue(Math.round(convertedAmount * 100) / 100);
                    }
                }
            );
        }
    }

}
