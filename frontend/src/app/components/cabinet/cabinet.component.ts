import { Component, OnInit } from '@angular/core';
import { AccountService, Role } from '../../injectable-services/account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CabinetService, _linksAccess, } from '../../injectable-services/cabinet.service';

@Component({
    selector: 'cabinet',
    template: `
        <div class="cabinet-container">
            <div class="left-side">
                <div class="company-name" [routerLink]="['/']" >Talkind</div>
                <div class="role-name">{{getNameRole()}}</div>
                <div class="container-buttons">
                    @for (item of pages; track $index) {
                        <div class="btn-page-container">
                            <a class="btn-page" [class.notify]="item.notify" [routerLink]="item.mainName" [routerLinkActive]="'active'">
                                <img [src]="'assets/img/cabinet/page-icons/' + item.mainName + '.svg'" alt="all-sessions">
                                <span>{{item.name}}</span>
                            </a>
                        </div>
                    }
                </div>
                <div class="footer-container">
                    <div class="name-account">
                        {{accService.data?.firstname}}
                        <br>
                        {{accService.data?.lastname}}
                    </div>
                    <div class="logout" (click)="logout()">
                        <img src="assets/img/cabinet/page-icons/logout.svg" alt="">
                    </div>
                </div>
            </div>
            <div class="right-side">
                <router-outlet />
            </div>
        </div>
    `,
    styleUrls:['./cabinet.scss']
})
export class CabinetComponent implements OnInit {
    constructor(
        protected accService : AccountService,  private router: Router, private http: HttpClient, private cabinetService: CabinetService) { }

    pages: any[] = []

    logout(){
        this.router.navigate(['auth'], {queryParams: { type: "authorization" }})
        this.accService.logOut();
    }

    ngOnInit(): void {
        if(!this.accService.data) return;

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

        for (const key in _linksAccess) {
            if(_linksAccess[key].roles.includes(this.accService.role)){
                this.pages.push({
                    name: _linksAccess[key].name,
                    mainName: key,
                    notify: false
                })
            }
        }
        if(this.pages.length > 0) this.router.navigateByUrl('cabinet/' + this.pages[0].mainName);
    }

    getNameRole(){
        switch(this.accService.role){
            case Role.Client: return "Клієнт";
            case Role.Psychologist: return "Фахівець"
            default: return null;
        }
    }
}



