import { Component, Input } from "@angular/core";
import { AccountData } from "../../injectable-services/account.service";
import { Router } from "@angular/router";

@Component({
    selector: "header",
    template: `
    <div class="header">
        <div class="header-main-container">
            <div class="left">
                <div class="left-company-name">
                    Happle
                </div>
                <div class="left-circle">

                </div>
            </div>
            <div class="right">
                <a routerLink="/" [ngClass]="{'active-page': activePage === 'home'}">Головна</a>
                <a routerLink="/psychologists" [ngClass]="{'active-page': activePage === 'psychologists'}">Психологи</a>
                <a routerLink="/tests" [ngClass]="{'active-page': activePage === 'tests'}">Тести</a>
                <a routerLink="/questions" [ngClass]="{'active-page': activePage === 'questions'}">Питання-відповіді</a>
                <a routerLink="/contacts" [ngClass]="{'active-page': activePage === 'contacts'}">Контакти</a>
                <button (click)="navigateToAuthorization()"> 
                    <ng-container *ngIf="account.data; else isAuth">
                        <span>{{ account.data.firstName.slice(0, 9) }}{{ account.data.firstName.length > 9 ? '...' : '' }}</span>
                    </ng-container>
                    <ng-template #isAuth>
                        <span>Увійти</span>
                    </ng-template>
                </button>
            </div>
        </div>
    </div>
    `,
    styleUrls: ['./header.scss']
})

export class HeaderComponent {
    @Input() activePage: string = '';

    constructor(private router: Router, protected account: AccountData) { }

    navigateToAuthorization() {
        this.router.navigate(['/auth'], { queryParams: { type: 'authorization' } });
    }
}
/*
<label class="switch">
          <input type="checkbox" (change)="toggleTheme.emit()">
          <span class="slider round"></span>
        </label> 


        // .switch {
    //     display: flex;
    //     align-items: center;
    //     margin-left: auto;
    //     cursor: pointer;  
    //     input {
    //       opacity: 0;
    //       width: 0;
    //       height: 0;
    //     } 
    //     .slider {
    //       position: relative;
    //       cursor: pointer;
    //       width: 60px;
    //       height: 34px;
    //       background-color: #ccc;
    //       border-radius: 17px;
    //       transition: .4s;
        
    //       &:before {
    //         content: "";
    //         position: absolute;
    //         height: 26px;
    //         width: 26px;
    //         background-color: white;
    //         border-radius: 50%;
    //         transition: .4s;
    //         left: 4px;
    //         top: 4px;
    //         transform: translateX(0);
    //       }
    //     } 
    //     input:checked + .slider {
    //       background-color: #2196F3;
    //       &:before {
    //         transform: translateX(26px);
    //       }
    //     } 
    //     input:focus + .slider {
    //       box-shadow: 0 0 1px #2196F3;
    //     }
    // }
*/