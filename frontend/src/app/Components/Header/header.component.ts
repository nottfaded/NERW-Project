import { Component, Input, SimpleChanges } from "@angular/core";
import { AccountService } from "../../injectable-services/account.service";
import { Router } from "@angular/router";

@Component({
    selector: "header",
    template: `
    <div class="header" [ngStyle]="{'background-color' : backgroundColor}">
        <div class="header-main-container">
            <div class="left">
                <div class="left-company-name">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                      <path d="M20 40C31.0457 40 40 31.0457 40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40Z" fill="#66BC8F"/>
                      <path d="M19.92 32C26.5032 32 31.84 26.6632 31.84 20.08C31.84 13.4968 26.5032 8.16 19.92 8.16C13.3368 8.16 8 13.4968 8 20.08C8 26.6632 13.3368 32 19.92 32Z" fill="white"/>
                      <path d="M37.4601 39.1314C37.5587 39.6141 37.0979 40.0226 36.6305 39.8667L29.9268 37.6308C29.4595 37.4749 29.3361 36.8715 29.7048 36.5447L34.993 31.8571C35.3617 31.5303 35.9459 31.7252 36.0446 32.2079L37.4601 39.1314Z" fill="#66BC8F"/>
                      <path d="M9.00779 31.7254C8.5345 31.8622 8.09057 31.4354 8.20872 30.9571L9.3957 26.1517C9.51384 25.6734 10.1055 25.5024 10.4606 25.8438L14.0287 29.2745C14.3838 29.6159 14.2362 30.2138 13.7629 30.3506L9.00779 31.7254Z" fill="white"/>
                    </svg>
                    <span>Talkind</span>
                </div>
                <div class="left-circle">

                </div>
            </div>
            <div class="right">
                <a routerLink="/" [class.active-page]="activePage === 'home'">Головна</a>
                <a routerLink="/psychologists" [class.active-page]="activePage === 'psychologists'">Терапевти</a>
                <a routerLink="/tests" [class.active-page]="activePage === 'tests'">Співпраця</a>
                <a routerLink="/questions" [class.active-page]="activePage === 'questions'">Про нас</a>
                <a routerLink="/contacts" [class.active-page]="activePage === 'contacts'">Питання-відповіді</a>
                    @if(account.data){
                        <button [routerLink]="'/cabinet'"><span>{{ account.data.firstname.slice(0, 9) }}{{ account.data.firstname.length > 9 ? '...' : '' }}</span></button>
                    } @else {
                        <button (click)="navigateToAuthorization()"><span>Увійти</span></button>
                    }
            </div>
        </div>
    </div>
    `,
    styleUrls: ['./header.scss']
})

export class HeaderComponent {
    @Input() activePage: string = '';
    backgroundColor: string = 'white';

    constructor(private router: Router, protected account: AccountService) { }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['activePage']) {
            if (this.activePage === 'home') this.backgroundColor = '#F1F9F3';
            else this.backgroundColor = 'white';
        }
    }

    navigateToAuthorization() {
        this.router.navigate(['/auth'], { queryParams: { type: 'authorization' } });
    }
}