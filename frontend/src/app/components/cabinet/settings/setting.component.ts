import { Component, Input, OnInit } from "@angular/core";
import { AccountData } from "../../../injectable-services/account.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { API_URL } from '../../../../main';

interface IddData {
    idd: string,
    country: string
}

@Component({
    // selector: 'test',
    template: `
        <div class="page-container">
            <div class="block-acc-info">
                <div class="block-acc-info-title">
                    <span>Профіль <span>#{{account.getId()}}</span></span>
                </div>

                <div class="block-acc-inputs-container">
                    <div class="block-acc-input">
                        <div class="input-container">
                            <input type="text" [(ngModel)]="firstname" (blur)="changeFirstname()" [style]="{'border-color': firstNameChanged ? '#66BC8F': '#C6C6C6'}">
                        </div>
                        <label>Ім'я</label>
                    </div>
                    <div class="block-acc-input">
                        <div class="input-container">
                            <input type="text" maxlength="14" [(ngModel)]="lastname" (blur)="changeLastname()" [style]="{'border-color': lastNameChanged ? '#66BC8F': '#C6C6C6'}">
                        </div>
                        <label>Прізвище</label>
                    </div>
                    <div class="block-acc-input">
                        <div class="country-img">
                            @if(activePhone.length != 0 && !activeFlag){
                                <img class="test" src="assets/img/cabinet/settings/not-found-country.svg" alt="">
                            } @else if(activePhone.length != 0) {
                                <span [class]="'fi fi-' + activeFlag"></span>
                            }
                        </div>
                        <div class="input-container">
                            <input type="tel" placeholder="+380000000000" maxlength="13"
                                (keypress)="checkInputPhone($event)"
                                [(ngModel)]="activePhone"
                                (ngModelChange)="onChangePhone()"
                                [style]="{'border-color': phoneChanged ? '#66BC8F': '#C6C6C6'}"
                                (blur)="changePhone()"
                            >
                        </div>
                        <label>Номер телефону</label>
                    </div>
                    <div class="block-acc-input">
                        <div class="input-container">
                            <input type="email" [(ngModel)]="email" [style]="{'border-color': emailChanged ? '#66BC8F': '#C6C6C6'}" (blur)="changeEmail()">
                        </div>
                        <label>Ел. пошта</label>
                    </div>
                </div>

                <div class="block-acc-inputs-container">
                    <div class="block-acc-input">
                        <div class="input-container">
                            <input type="password" maxlength="20" [(ngModel)]="prevPassword"  [style]="{'border-color': passwordChanged ? '#66BC8F': '#C6C6C6'}">
                        </div>
                        <label>Старий пароль</label>
                    </div>
                    <div class="block-acc-input">
                        <div class="input-container">
                            <input [type]="passIsUnlock ? 'text' : 'password'" maxlength="20" [(ngModel)]="newPassword"  [style]="{'border-color': passwordChanged ? '#66BC8F': '#C6C6C6'}">
                            <button (click)="passIsUnlock = !passIsUnlock">
                                <img [src]="'assets/img/authentication/' + (passIsUnlock ? 'eye-pass-unlock.svg' : 'eye-pass-lock.svg')" alt="eye-pass">
                            </button>
                        </div>
                        <label>Новий пароль</label>
                        <div class="err-msg">
                            {{errPassword}}
                        </div>
                    </div>
                </div>

                <button (click)="changePassword()" class="change-pass">Змінити пароль</button>

                <div class="block-notify-settings">
                    <div class="block-notify-top">
                        <div class="left">
                            Повідомлення
                        </div>
                        <div class="right">
                            <div class="right-item">
                                <img id="mail" src="assets/img/cabinet/settings/mail-active.svg" alt="">
                                <span>Пошта</span>
                            </div>
                            <div class="right-item">
                                <img id="telegram" src="assets/img/cabinet/settings/telegram-active.svg" alt="">
                                <span>Telegram</span>
                            </div>
                            <div class="right-item">
                                <img id="site" src="assets/img/cabinet/settings/site-active.svg" alt="">
                                <span>Цей сайт</span>
                            </div>
                        </div>
                    </div>
                    <div class="block-notify-bottom">
                        @for (item of account.notifySettings; track $index) {
                            <div class="block-item">
                                <div class="left">
                                    {{notifyTranslate[item.name]}}
                                </div>
                                <div class="right">
                                    <button (click)="changeNotify($index, 'mail')">
                                        <img id="mail" [src]="'assets/img/cabinet/settings/mail-' + (item.mail ? 'active.svg' : 'inactive.svg')" alt="setting-mail">
                                    </button>
                                    <button (click)="changeNotify($index, 'telegram')">
                                        <img id="telegram" [src]="'assets/img/cabinet/settings/telegram-' + (item.telegram ? 'active.svg' : 'inactive.svg')" alt="setting-telegram">
                                    </button>
                                    <button (click)="changeNotify($index, 'site')">
                                        <img id="site" [src]="'assets/img/cabinet/settings/site-' + (item.site ? 'active.svg' : 'inactive.svg')" alt="setting-site">
                                    </button>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    `,
    styleUrls: ['../cabinet.scss', './settings.scss', './select.scss']
})
export class SettingComponent implements OnInit {
    constructor(protected account: AccountData, private http: HttpClient) { }

    ngOnInit(): void {
        this.firstname = this.account.data ? this.account.data.firstName : "";
        this.lastname = this.account.data ? this.account.data.lastName : "";
        this.email = this.account.data ? this.account.data.email : "";
        this.activePhone = this.account.data ? this.account.data.phone : "";

        this.http.get('https://restcountries.com/v3.1/all').subscribe({
            next: (data: any) => {
                const takenCountries = data.filter((i: any) => this.countries.includes(i.name.common));
                for (const country of takenCountries) {
                    this.countriesIdd.push({
                        idd: country.idd.root + country.idd.suffixes.join(''),
                        country: country.cca2.toLowerCase()
                    });
                }
                this.setFlagForPhone();
            },
            error: (error) => {
                console.error('Error getting list of countries', error);
            }
        });
    }
    firstname = "";
    lastname = "";
    email = "";

    countries = ['Ukraine', 'Poland'];
    countriesIdd: IddData[] = [];

    activePhone = "";
    activeFlag: string | null = null;

    passIsUnlock = false;

    notifyTranslate: { [key: string]: string } = {
        'SessionNotPaid': 'Не оплачено сеанс',
        'SessionTransfer': 'Перенесення сеансу',
        'SessionCancellation': 'Скасування сеансу',
        'TaskReminders': 'Нагадування про завдання',
        'OneHoureBefore': 'За годину до початку сеансу',
    }
    firstNameChanged = false;
    lastNameChanged = false;
    phoneChanged = false;
    emailChanged = false;

    prevPassword = "";
    newPassword = "";
    errPassword = "";
    passwordChanged = false;

    checkInputPhone(event: KeyboardEvent) {
        if (this.activePhone.length === 0) {
            if (event.key != "+") {
                event.preventDefault()
            }

            return;
        }

        if (isNaN(Number(event.key))) event.preventDefault()
    }
    onChangePhone() {
        const regex = /^\+\d*$/;
        if (!regex.test(this.activePhone)) {
            setTimeout(() => {
                this.activePhone = ""
            })
            return;
        }

        this.setFlagForPhone();
    }
    setFlagForPhone() {
        let chars = '';
        this.activeFlag = null;
        for (const char of this.activePhone) {
            chars += char;
            let idd = this.countriesIdd.find(i => i.idd === chars);
            if (idd) {
                this.activeFlag = idd.country;
            }
        }
    }


    //#region events with server-side
    changeFirstname() {
        if (!this.account.data) return;
        if (this.firstname === this.account.data.firstName) return;
        if (this.firstname.length < 3 || !/^[a-zA-Zа-яА-ЯєЄіІїЇґҐ]+$/.test(this.firstname)) {
            this.firstname = this.account.data.firstName;
            return;
        }

        this.firstname = this.firstname.charAt(0).toUpperCase() + this.firstname.slice(1).toLowerCase();

        const data = {
            id: this.account.data.id,
            firstName: this.firstname
        }

        this.http.post(API_URL + `settings/changeFirstName`, data, {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        })
            .subscribe({
                next: (data: any) => {
                    if (this.account.data) {
                        this.firstNameChanged = true;

                        this.account.data.firstName = this.firstname;
                        this.account.updateLocalStorage();

                        setTimeout(() => {
                            this.firstNameChanged = false;
                        }, 1000)
                    }
                },
                error: response => {
                    this.firstname = !this.account.data ? "" : this.account.data.firstName;
                }
            });
    }
    changeLastname() {
        if (!this.account.data) return;
        if (this.lastname === this.account.data.lastName) return;
        if (this.lastname.length < 3 || !/^[a-zA-Zа-яА-ЯєЄіІїЇґҐ]+$/.test(this.lastname)) {
            this.lastname = this.account.data.lastName;
            return;
        }

        this.lastname = this.lastname.charAt(0).toUpperCase() + this.lastname.slice(1).toLowerCase();

        const data = {
            id: this.account.data.id,
            lastName: this.lastname
        }

        this.http.post(API_URL + `settings/changeLastName`, data, {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        })
            .subscribe({
                next: (data: any) => {
                    if (this.account.data) {
                        this.lastNameChanged = true;

                        this.account.data.lastName = this.lastname;
                        this.account.updateLocalStorage();

                        setTimeout(() => {
                            this.lastNameChanged = false;
                        }, 1000)
                    }
                },
                error: response => {
                    this.lastname = !this.account.data ? "" : this.account.data.lastName;
                }
            });
    }
    changePhone() {
        if (!this.account.data) return;
        if (this.activePhone === this.account.data.phone) return;
        if (this.activePhone.length != 13 || !/^\+\d*$/.test(this.activePhone)) {
            this.activePhone = this.account.data.phone;
            return;
        }

        const data = {
            id: this.account.data.id,
            phone: this.activePhone
        }

        this.http.post(API_URL + `settings/changePhone`, data, {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        })
            .subscribe({
                next: (data: any) => {
                    this.phoneChanged = true;

                    if (this.account.data) this.account.data.phone = this.activePhone;
                    this.account.updateLocalStorage();

                    setTimeout(() => {
                        this.phoneChanged = false;
                    }, 1000)
                },
                error: response => {
                    this.activePhone = !this.account.data ? "" : this.account.data.phone;
                }
            });
    }
    changeEmail() {
        if (!this.account.data) return;
        if (this.email === this.account.data.email) return;
        if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]+$/.test(this.email)) {
            this.email = this.account.data.email;
            return;
        }

        const data = {
            id: this.account.data.id,
            email: this.email
        }

        this.http.post(API_URL + `settings/changeEmail`, data, {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        })
            .subscribe({
                next: (data: any) => {
                    this.emailChanged = true;

                    if (this.account.data) this.account.data.email = this.email;
                    this.account.updateLocalStorage();

                    setTimeout(() => {
                        this.emailChanged = false;
                    }, 1000)
                },
                error: response => {
                    this.email = !this.account.data ? "" : this.account.data.email;
                }
            });
    }
    changePassword() {
        if (!this.account.data) return;
        if (this.prevPassword === "") return;
        if (this.newPassword.length < 6) {
            this.errPassword = "Мінімальний розмір пароля 6 символів";
            return;
        }

        const data = {
            id: this.account.data.id,
            prevPassword: this.prevPassword,
            newPassword: this.newPassword,
        }

        this.http.post(API_URL + `settings/changePassword`, data, {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        })
            .subscribe({
                next: (data: any) => {
                    this.passwordChanged = true;

                    setTimeout(() => {
                        this.prevPassword = "";
                        this.newPassword = "";
                        this.errPassword = "";
                        this.passwordChanged = false;
                    }, 1000)
                },
                error: response => {
                    if (typeof response.error === 'string') {
                        this.errPassword = response.error;
                    }
                }
            });
    }
    changeNotify(index: number, event: string) {
        if (!this.account.data) return;

        this.http.post(API_URL + `settings/changeNotify`, {
            id: this.account.data.id,
            index: index,
            event: event
        }, {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        })
            .subscribe({
                next: (data: any) => {
                    switch(event){
                        case 'mail': this.account.notifySettings[index].mail = !this.account.notifySettings[index].mail; break;
                        case 'telegram': this.account.notifySettings[index].telegram = !this.account.notifySettings[index].telegram; break;
                        case 'site': this.account.notifySettings[index].site = !this.account.notifySettings[index].site; break;
                    }
                    this.account.updateLocalStorage();
                },
                error: response => {
                    
                }
            });
    }
    //#endregion
}
