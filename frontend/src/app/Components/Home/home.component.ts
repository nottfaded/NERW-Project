import { Component } from "@angular/core";
import { ThemeService } from "../../InjectableServices/theme.service";
import { AccountData } from "../../InjectableServices/account.service";
import { HttpClient } from "@angular/common/http";
import { API_URL } from "../../../main";
@Component({
    selector: "home-page",
    template: `
    <header></header>
    <div class="home-page f-jost">
        <div *ngIf="account.user != null else notAuth">
            <p>{{account.user.firstname}}</p>
            <p>{{account.user.lastname}}</p>
            <p>{{account.user.email}}</p>
            <p>{{account.user.birthday?.getDay()}} {{account.user.birthday?.getMonth()}} {{account.user.birthday?.getFullYear()}}</p>
            <br>
            <div class="bts-test">
                <button (click)="clickTest(1)">Client</button>
                <button (click)="clickTest(2)">Psychologist</button>
                <button (click)="clickTest(3)">All</button>
                <button (click)="account.logOut()">LOGOUT</button>
            </div>
        </div>
        <ng-template #notAuth>
            <span>Не авторизований</span>
        </ng-template>
        
    </div>`,
    styleUrls:[],
    styles: [`
    .bts-test { display: flex; flex-direction: column; align-items:center; & > button{border: 1px solid red; width: 10vh; margin: 1vh;} }`]
})

export class HomeComponent { 
    constructor(protected themeService: ThemeService, protected account: AccountData, private http: HttpClient) { }

    clickTest(id: number){
        let url = "";
        switch(id){
            case 1: url = "client"; break;
            case 2: url = "psyhologist"; break;
            case 3: url = "all"; break;
            default: return;
        }
        this.http.get(API_URL + "accounts/" + url).subscribe({
            next: (data: any) => {
                alert("Ви маєте доступ");
            },
            error: (er: any) => {
                console.log(er);
            }
        })
    }
}