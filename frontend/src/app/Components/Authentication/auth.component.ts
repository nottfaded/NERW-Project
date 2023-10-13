import { Component } from "@angular/core";
import { ThemeService } from "../../InjectableServices/theme.service";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URL } from "../../../main";
import { AccountData } from "../../InjectableServices/account.service";

@Component({
  selector: "auth-page",
  template: `
    <div class="auth f-jost" (click)="dateActiveItem = 0">
      <div class="header">
          
      </div>

      <div class="main">

        <div class="main-left">
          <div class="main-circle small"></div>
          <div class="main-circle medium"></div>
          <div class="main-circle big"></div>
          <img src="/assets/img/Authentication/auth-reg-girl.png" alt="girl" class="main-circle-icon">
        </div>

        <div class="main-right">
          <div class="main-right-container">
            <div *ngIf="isReg; else auth">
              <div class="main-right-title" >
                <div class="main-right-title-item">
                  Реєстрація
                </div>
              </div>
              <div class="main-right-container-inputs">
                <div class="main-right-container-name">
                  <div class="error-message" *ngIf="!newNameIsValid()"><span>Ім'я та прізвище повинні складатися мінімум з 3 символів.</span></div>
                  <input type="text" placeholder="Ім'я" 
                    [ngClass]="{'is-error-input': !newNameIsValid()}" (input)="newName.isInput = true" [(ngModel)]="newName.firstName" (keypress)="checkInputName($event)">
                  <input type="text" placeholder="Прізвище" 
                    [ngClass]="{'is-error-input': !newNameIsValid()}" (input)="newName.isInput = true" [(ngModel)]="newName.lastName" (keypress)="checkInputName($event)">
                </div>
                <div class="main-right-container-email">
                  <div class="error-message" *ngIf="!newEmailIsValid()"><span>Недійсний формат поштової адреси <i>example@email.com</i>.</span></div>
                  <input type="email" placeholder="Email" 
                    [ngClass]="{'is-error-input': !newEmailIsValid()}" (input)="newEmail.isInput = true" [(ngModel)]="newEmail.email" >
                </div>
                <div class="main-right-container-password">
                  <div class="error-message" *ngIf="!newPasswordIsValid()"><span>Пароль повинен складатися мінімум з 6 символів.</span></div>
                  <input [type]="passIsUnlock ? 'text' : 'password'" placeholder="Новий пароль" 
                    [ngClass]="{'is-error-input': !newPasswordIsValid()}" (input)="newPassword.isInput = true" [(ngModel)]="newPassword.password" >
                  <img (click)="changePassLock()" class="eye-pass" [src]="passIsUnlock ? '/assets/img/Authentication/eye-pass-unlock.svg' : '/assets/img/Authentication/eye-pass-lock.svg'" alt="eye-pass">
                </div>
              </div>

              <div class="main-right-container-birthday">
                <div class="error-message" *ngIf="birthdayWasTouched && !birthdayIsValid()" [style]="{'margin-top': '-1.017632398753894vh'}"><span>Вибрано недійсну дату або вам меньше 16 років.</span></div>
                <div class="birthday-header">
                  <div><span>Дата народження:</span></div>
                  <div><span>{{currentYearsOld}} років</span></div>
                </div>
                
                <div class="birthday-inputs">
                  <div class="item-list-date">
                    <div class="item-list" (click)="$event.stopPropagation(); setDateActiveItem(1)">
                      {{activeDay}}
                      <img src="/assets/img/Authentication/white-arrow-icon.svg" alt="arrow">
                    </div>
                    <ul class="list-of-date" [ngClass]="{'active': dateActiveItem === 1}" >
                      <li class="item-list" *ngFor="let day of days" (click)="setActiveDay(day)">{{day}}</li>
                    </ul>
                  </div>
                  <div class="item-list-date">
                    <div class="item-list" (click)="$event.stopPropagation(); setDateActiveItem(2)">
                      {{month[activeMonth]}}
                      <img src="/assets/img/Authentication/white-arrow-icon.svg" alt="arrow">
                    </div>
                    <ul class="list-of-date" [ngClass]="{'active': dateActiveItem === 2}">
                      <li class="item-list" *ngFor="let item of month | keyvalue" (click)="setActiveMonth(+item.key)">{{item.value}}</li>
                    </ul>
                  </div>
                  <div class="item-list-date">
                    <div class="item-list" (click)="$event.stopPropagation(); setDateActiveItem(3)">
                      {{activeYear}}
                      <img src="/assets/img/Authentication/white-arrow-icon.svg" alt="arrow">
                    </div>
                    <ul class="list-of-date" [ngClass]="{'active': dateActiveItem === 3}">
                      <li class="item-list" *ngFor="let year of years" (click)="setActiveYear(year)">{{year}}</li>
                    </ul>
                    
                  </div>
                </div>

                <div class="birthday-footer">
                  Натискаючи кнопку "Створити аккаунт", ви приймаєте наші <a href="">Умови використання</a>, <a href="">Політику конфіденційності</a> та <a href="">Політику щодо файлів cookie</a>.
                </div>
              </div>

              <div class="btns-footer-reg">
                <button [ngClass]="{'not-inputs-data': !isCanReg()}" (click)="createAccount()">
                  Створити аккаунт 
                </button>
                <a (click)="navigateToAuthReg()">Увійти в існуючий аккаунт</a>
              </div>
            </div>
            
            <ng-template #auth>
              <div class="main-right-title">
                <div class="main-right-title-item">
                  Увійти
                </div>
              </div>
  
              <div class="main-right-container-inputs">
                <div class="main-right-container-email">
                  <input type="text" placeholder="Email" [(ngModel)]="email">
                </div>
                <div class="main-right-container-password">
                  <input [type]="passIsUnlock ? 'text' : 'password'" placeholder="Новий пароль" [(ngModel)]="password">
                  <img (click)="changePassLock()" class="eye-pass" [src]="passIsUnlock ? '/assets/img/Authentication/eye-pass-unlock.svg' : '/assets/img/Authentication/eye-pass-lock.svg'" alt="eye-pass">
                </div>
              </div>

              <div class="main-right-container-error-message">
                <div class="error-message-login">{{errorMsg}}</div>
                <a>Забули пароль?</a>
              </div>
  
              <div class="btns-footer-auth">
                <button [ngClass]="{'not-inputs-data': !isCanLogIn() }" (click)="logIn()">Вхід</button>
                <div class="create-new-acc-btn">
                  <span>Замість цього...</span>
                  <button (click)="navigateToAuthReg()">Створити новий аккаунт</button>
                </div>
              </div>
            </ng-template>
          </div>

        </div>

      </div>

    </div>`,
  styleUrls: ['./auth.scss'],
})

export class AuthComponent {
  isReg: boolean = true;

  passIsUnlock: boolean = false;
  //#region birthday variables
  days: number[] = [];
  month: { [key: number]: string } = { 1: 'Січень', 2: 'Лютий', 3: 'Березень', 4: 'Квітень', 5: 'Травень', 6: 'Червень', 7: 'Липень', 8: 'Серпень', 9: 'Вересень', 10: 'Жовтень', 11: 'Листопад', 12: 'Грудень' };
  years: number[] = [];

  activeDay: number = new Date().getDate();
  activeMonth: number = new Date().getMonth() + 1;
  activeYear: number = new Date().getFullYear();

  dateActiveItem: number = 0;
  currentYearsOld: number = 0;
  birthdayWasTouched: boolean = false;
  //#endregion
  //#region registration variables
  newName = { "firstName": "", "lastName": "", isInput: false }
  newEmail = { "email": "", isInput: false }
  newPassword = { "password": "", isInput: false }
  //#endregion
  //#region authorization
  email = "";
  password = "";
  errorMsg: string = '';
  //#endregion

  constructor(protected themeService: ThemeService, private route: ActivatedRoute, private router: Router, private http: HttpClient,
    protected account : AccountData) {
    route.queryParams.subscribe((params) => {
      if(!params['type'] || (params['type'] != 'authorization' && params['type'] != 'registration')){
        this.router.navigate(['/auth'], { queryParams: { type: "authorization" } });
      }else{
        this.isReg = params['type'] !== 'authorization';
      }
    });
  }

  ngOnInit() {
    for (let i = 1; i <= 31; i++) this.days.push(i);
    for (let i = this.activeYear; i >= 1970; i--) this.years.push(i);
  }

  navigateToAuthReg() {
    this.isReg = !this.isReg;
    const type = this.isReg ? 'registration' : 'authorization';
    this.resetAllVariables();
    this.router.navigate(['/auth'], { queryParams: { type: type } });
  }
  changePassLock(): any {
    this.passIsUnlock = !this.passIsUnlock;
  }
  resetAllVariables(){
    this.newName.firstName = "";
    this.newName.lastName = "";
    this.newName.isInput = false;
    this.newPassword.password = "";
    this.newPassword.isInput = false;
    this.newEmail.email = "";
    this.newEmail.isInput = false;
    this.activeDay = new Date().getDate();
    this.activeMonth = new Date().getMonth() + 1;
    this.activeYear = new Date().getFullYear();
    this.birthdayWasTouched = false;
    this.email = "";
    this.password = "";
    this.passIsUnlock = false;
    this.errorMsg = "";
  }

  //#region registration

  //#region func for birthday
  setDateActiveItem(val: number) {
    this.birthdayWasTouched = true;
    if (this.dateActiveItem == val) this.dateActiveItem = 0;
    else this.dateActiveItem = val;
  }
  setActiveDay(day: number) {
    if (this.dateActiveItem != 1) return;
    this.activeDay = day;
    this.countCurrentYearsOld();
  }
  setActiveMonth(month: number) {
    if (this.dateActiveItem != 2) return;
    this.activeMonth = month;
    this.countCurrentYearsOld();
  }
  setActiveYear(year: number) {
    if (this.dateActiveItem != 3) return;
    this.activeYear = year;
    this.countCurrentYearsOld();
  }
  private countCurrentYearsOld() {
    let now = new Date();
    let today = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate());
    let dob = new Date(this.activeYear, this.activeMonth, this.activeDay);
    let dobnow = new Date(today.getFullYear(), dob.getMonth() + 1, dob.getDate());
    let age = today.getFullYear() - dob.getFullYear();
    if (today < dobnow) {
      age = age - 1;
    }
    if (age < 0) age = 0;
    this.currentYearsOld = age;
  }
  //#endregion

  newNameIsValid() {
    return !this.newName.isInput || (this.newName.firstName.length > 3 && this.newName.lastName.length > 3);
  }
  newEmailIsValid() {
    return !this.newEmail.isInput || /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]+$/.test(this.newEmail.email);
  }
  newPasswordIsValid() {
    return !this.newPassword.isInput || this.newPassword.password.length >= 6;
  }
  birthdayIsValid() {
    const date = new Date(this.activeYear, this.activeMonth - 1, this.activeDay);
    if (date.getFullYear() === this.activeYear && date.getMonth() === this.activeMonth - 1 && date.getDate() === this.activeDay && this.currentYearsOld >= 16) return true;
    return false;
  }
  checkInputName(e: any) {
    if (!/^[а-яА-ЯіІїЇєЄёЁ\s']+$/.test(e.key)) e.preventDefault();
  }
  isCanReg() {
    return this.newNameIsValid() && this.newEmailIsValid() && this.newPasswordIsValid() && this.birthdayIsValid();
  }

  
  //#endregion

  isCanLogIn(){ return this.email != '' && /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]+$/.test(this.email) && this.password != '' }

  createAccount() {
    if(!this.isCanReg()) return;
    const acccountData = {
      'Email': this.newEmail.email,
      'Password': this.newPassword.password,
      'Name': this.newName.firstName.charAt(0).toUpperCase() + this.newName.firstName.slice(1).toLowerCase(),
      'Surname': this.newName.lastName.charAt(0).toUpperCase() + this.newName.lastName.slice(1).toLowerCase(),
      'Birthday': new Date(this.activeYear, this.activeMonth, this.activeDay).toISOString().slice(0, 10)
    };
    this.http.post(API_URL + 'accounts/create', acccountData, { 
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }) 
    })
    .subscribe({
      next: (data: any) => {
        this.navigateToAuthReg();
      },
      error: er => {
        
      }
    });
  }

  logIn() {
    if(!this.isCanLogIn()) return;
    const acccountData = {
      'Email': this.email,
      'Password': this.password,
    };
    this.http.post(API_URL + `accounts/logIn`, acccountData, { 
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }) 
    })
    .subscribe({
      next: (data: any) => {
        localStorage.setItem("accessToken", data.jwtToken);
        localStorage.setItem("accountData", JSON.stringify(data.account));
        this.account.getData();
        this.router.navigate(['']);
      },
      error: response => {
        if(response.error == 1)
        {
          this.errorMsg = "Користувач із зазначеним email не знайдено.";
        }else if(response.error == 2){
          this.errorMsg = "Невірний пароль.";
        }
      }
    });
  }

}