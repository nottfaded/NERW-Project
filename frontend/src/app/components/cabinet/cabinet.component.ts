import { Component, OnInit } from '@angular/core';
import { AccountData, Role } from '../../injectable-services/account.service';
import { SettingComponent } from './settings/setting.component';
import { Router } from '@angular/router';
import { AllSessionsComponent } from './all-sessions/all-sessions.component';
import { HttpClient } from '@angular/common/http';
import { CabinetService, ISession, SessionData, } from '../../injectable-services/cabinet.service';
import { API_URL } from '../../../main';

@Component({
    selector: 'cabinet',
    template: `
        <div class="cabinet-container">
            <div class="left-side">
                <div class="company-name" [routerLink]="['/']" >Talkind</div>
                <div class="role-name">{{getNameRole()}}</div>
                <div class="container-buttons">
                    @for (item of pages; track $index) {
                        @if (item.roles.includes(account.role)) {
                            <div class="btn-page-container">
                                <div class="btn-page" [ngClass]="{
                                    'notify': item.notify,
                                    'active': activePage == $index
                                }"
                                (click)="activePage = $index"
                                >
                                    <img [src]="'assets/img/cabinet/page-icons/' + item.img + '.svg'" alt="all-sessions">
                                    <span>{{item.name}}</span>
                                </div>
                            </div>
                        }
                    }
                </div>
                <div class="footer-container">
                    <div class="name-account">
                        {{account.data?.firstName}}
                        <br>
                        {{account.data?.lastName}}
                    </div>
                    <div class="logout" (click)="logout()">
                        <img src="assets/img/cabinet/page-icons/logout.svg" alt="">
                    </div>
                </div>
            </div>
            <div class="right-side">
                <div [ngComponentOutlet]="pages[activePage].component"></div>
            </div>
        </div>
    `,
    styleUrls:['./cabinet.scss']
})
export class CabinetComponent implements OnInit {
    constructor(
        protected account : AccountData,  private router: Router, private http: HttpClient, private cabinetService: CabinetService 
    ) { }

    activePage = 0;
    pages = [
        {name: 'Всі сеанси', img: "all-sessions", roles: [Role.Clien, Role.Psychologist], component: AllSessionsComponent, notify: false},
        {name: 'Налаштування', img: "settings", roles: [Role.Clien, Role.Psychologist], component: SettingComponent, notify: false},
    ]

    logout(){
        this.router.navigate(['auth'], {queryParams: { type: "authorization" }})
        this.account.logOut();
    }

    ngOnInit(): void {
        if(!this.account.data) return;

        // this.http.get<ISession[]>(API_URL + `sessions/getSessions/${this.account.data.id}`)
        // .subscribe(
        //     (sessions: ISession[]) => {
        //         this.cabinetService.setAllSession(sessions); 
        //     },
        //     error => {
        //         console.error(error);
        //     }
        // )
        this.cabinetService.setAllSession([{
            city: 'Київ',
            clientPhone: "05073116162",
            countMinutes: 50,
            date: new Date(2024, 1, 6, 10, 0, 0),
            id: 1,
            status: "NotPayed",
            rating: 0,
            street: "вул. Шевченка, б. 35",
            user: {
                name: 'Олександр',
                surname: 'Невмирич'
            }
        }])
    }

    getNameRole(){
        switch(this.account.role){
            case Role.Clien: return "Клієнт";
            case Role.Psychologist: return "Фахівець"
            default: return null;
        }
    }
}



