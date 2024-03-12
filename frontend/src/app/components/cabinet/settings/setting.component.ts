import { Component, OnInit } from "@angular/core";
import { AccountService, PsychInfo, Role } from "../../../injectable-services/account.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { API_URL } from '../../../../main';
import { ActivatedRoute, Router } from "@angular/router";
import { CabinetService, Specialization } from "../../../injectable-services/cabinet.service";
import { Education } from "../../../models/education";

interface IddData {
    idd: string,
    country: string
}

enum EditType {
    Main, Specialization, Education, Price
}
interface EditPage {
    type: EditType,
    template: string
}

@Component({
    template: `
        @switch (settingsPage) {
            @case('edit'){
            <div class="page-container">

                <div class="settings-container">
                    <div class="left-side">

                        <!-- <div class="account-id">
                          <span>Профіль <span>#{{account.getId()}}</span></span>
                        </div> -->

                        <div class="psych-settings-container">
                            @switch (activeEditPage) {
                                @case(0){
                                    <div class="block-psych-settings" id="specialization">
                                        <div class="title">1. Ваша спеціалізація <span>(одна або декілька)</span>:</div>
                                        <div class="list-buttons">
                                            @for (spec of cabService.specializations; track $index) {
                                                <button class="select" 
                                                    [class.active]="checkSpecialization(spec.id)" 
                                                    (click)="setSpecialization(spec); wasChange = true"
                                                ><div>{{spec.type}}</div></button>
                                            }
                                        </div>
                                    </div>
                                
                                    <div class="block-psych-settings" id="language">
                                        <div class="title">2. Мови спілкування <span>(Розмовний рівень)</span>:</div>
                                        <div class="list-buttons">
                                            <button class="select" 
                                                [class.active]="checkLang('ua')"
                                                (click)="setLang('ua'); wasChange = true"
                                            ><div>Українська</div></button>
                                            <button class="select" 
                                                [class.active]="checkLang('pl')"
                                                (click)="setLang('pl'); wasChange = true"
                                            ><div>Польська</div></button>
                                        </div>
                                    </div>
                                
                                    <div class="block-psych-settings" id="years-old">
                                        <div class="title">3. Ваш вік:</div>
                                        <div class="custome-input-number">
                                            <input 
                                                type="text" 
                                                [(ngModel)]="year"
                                                (keypress)="checkCorrectYear($event)"
                                                maxlength="3">
                                            <div class="arrow-btns">
                                                <div class="arrow" (click)="addYear(); wasChange = true">▲</div>
                                                <div class="arrow" (click)="delYear(); wasChange = true">▼</div>
                                            </div>
                                        </div>
                                    </div>
                                
                                    <div class="block-psych-settings" id="language">
                                        <div class="title">4. Формат зустрічей:</div>
                                        <div class="list-buttons">
                                            <button class="select" 
                                                [class.active]="checkMeet('online')"
                                                (click)="setMeet('online'); wasChange = true"
                                            ><div>Онлайн</div></button>
                                            <button class="select" 
                                                [class.active]="checkMeet('intramural')"
                                                (click)="setMeet('intramural'); wasChange = true"
                                            ><div>Очно</div></button>
                                        </div>
                                    </div>
                                
                                    <div class="block-psych-settings" id="language" [class.deactivated]="false">
                                        <div class="title">5. Місто та адреса прийому</div>
                                        <div class="inputs-address">
                                            <input type="text" id="city" placeholder="м. Харків" 
                                                [(ngModel)]="psychInfoCopy.city" 
                                                (blur)="wasChange = true"
                                            >
                                            <input type="text" id="address" placeholder="вул. Тараса Шевченка 35б"  
                                                [(ngModel)]="psychInfoCopy.address" 
                                                (blur)="wasChange = true"
                                            >
                                        </div>
                                    </div>
                                }
                                @case(1){
                                    <div class="block-psych-settings">
                                        <div class="title">6. Типи психотерапії:</div>
                                        <div class="list-buttons">
                                            <button class="select" 
                                                [ngClass]="buttonStyle(psychInfoCopy.personalTherapy)" 
                                                (click)="psychInfoCopy.personalTherapy = !psychInfoCopy.personalTherapy; wasChange = true"
                                            ><div>Особиста</div></button>
                                            <button class="select" 
                                                [ngClass]="buttonStyle(psychInfoCopy.familyTherapy)" 
                                                (click)="psychInfoCopy.familyTherapy = !psychInfoCopy.familyTherapy; wasChange = true"
                                            ><div>Сімейна терапія</div></button>
                                            <button class="select" 
                                                [ngClass]="buttonStyle(psychInfoCopy.childrenTherapy)" 
                                                (click)="psychInfoCopy.childrenTherapy = !psychInfoCopy.childrenTherapy; wasChange = true"
                                            ><div>Дитяча терапія</div></button>
                                        </div>
                                    </div>

                                    <div class="block-psych-settings" [class.deactivated]="!psychInfoCopy.personalTherapy">
                                        <div class="title">7. Типи психотерапії (Особиста терапія):</div>
                                        <div class="list-buttons">
                                            @for (therapyType of therapyArr['Особиста']; track $index) {
                                                <button class="select" 
                                                    [class.active]="containsTherapyTypeByName(therapyType)"
                                                    (click)="setTherapyType(therapyType); wasChange = true"
                                                ><div>{{therapyType}}</div></button>
                                            }
                                        </div>
                                    </div>

                                    <div class="block-psych-settings" [class.deactivated]="!psychInfoCopy.familyTherapy">
                                        <div class="title">8. Типи психотерапії (Сімейна терапія):</div>
                                        <div class="list-buttons">
                                            @for (therapyType of therapyArr['Сімейна']; track $index) {
                                                <button class="select" 
                                                    [class.active]="containsTherapyTypeByName(therapyType)"
                                                    (click)="setTherapyType(therapyType); wasChange = true"
                                                ><div>{{therapyType}}</div></button>
                                            }
                                        </div>
                                    </div>

                                    <div class="block-psych-settings" [class.deactivated]="!psychInfoCopy.childrenTherapy">
                                        <div class="title">9. Типи психотерапії (Дитяча терапія):</div>
                                        <div class="list-buttons">
                                            @for (therapyType of therapyArr['Дитяча']; track $index) {
                                                <button class="select" 
                                                    [class.active]="containsTherapyTypeByName(therapyType)"
                                                    (click)="setTherapyType(therapyType); wasChange = true"
                                                ><div>{{therapyType}}</div></button>
                                            }
                                        </div>
                                    </div>
                                }
                                @case(2){
                                    <div class="block-psych-settings">
                                        <div class="title">11. Ваша освіта (вища освіта і курси):</div>
                                        <div class="inputs-eductaion-container">
                                            @for (education of educations; track $index) {
                                                <div class="inputs-education">
                                                    <input type="text" placeholder="Донбаський Державний Педагогічний Університет" 
                                                        [(ngModel)]="education.university"
                                                        (blur)="wasChange = true"
                                                        (focus)="moveFocus($index)"
                                                        [id]="'education-' + $index + ':' + 1"
                                                    >
                                                    <input type="text" placeholder="«Практична психологія»" 
                                                        [(ngModel)]="education.faculty"
                                                        (blur)="wasChange = true"
                                                        (focus)="moveFocus($index)"
                                                        [id]="'education-' + $index + ':' + 2"
                                                    >
                                                    <input type="text" placeholder="2024" 
                                                        [(ngModel)]="education.year"
                                                        (blur)="wasChange = true"
                                                        (keypress)="onNumberInput($event)"
                                                        (focus)="moveFocus($index)"
                                                        [id]="'education-' + $index + ':' + 3"
                                                    >
                                                </div>
                                            }
                                        </div>
                                    </div>
                                }
                                @case(3){
                                    <div class="block-psych-settings">
                                        <div class="title">13. Ціна за один сеанс <span>(Мінімальна комісія 250 грн, надалі ~30% або за домовленістю)</span>:</div>
                                        <div class="list-buttons">
                                            <button class="select" [class.active]="true"><div>UA - Гривня (₴)</div></button>
                                        </div>

                                        <div class="block-price-session-container">
                                            <div class="block-price-session" [class.deactivated] = "false">
                                                <div class="block-price-container">
                                                    <div class="title">Особиста</div>
                                                    <div class="line"></div>

                                                    <div class="container-w-input">
                                                        <div class="title">Сума, яку ви будете отримувати. </div>
                                                        <input type="text" 
                                                            [(ngModel)]="psychInfoCopy.personalSalary" 
                                                            (blur)="changePrices(0, true); wasChange = true" 
                                                            (keypress)="onNumberInput($event)"
                                                        >
                                                        <div class="sub-title">Ціна враховуючи ваш досвід роботи та підходи</div>
                                                    </div>

                                                    <div class="line"></div>

                                                    <div class="container-w-input">
                                                        <div class="title">Ціна на сеанс що буде відображатись.</div>
                                                        <input type="text" 
                                                            [(ngModel)]="psychInfoCopy.personalPrice" 
                                                            (blur)="changePrices(0, false); wasChange = true" 
                                                            (keypress)="onNumberInput($event)"
                                                        >
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="block-price-session" [class.deactivated] = "false">
                                                <div class="block-price-container">
                                                    <div class="title">Сімейна</div>
                                                    <div class="line"></div>

                                                    <div class="container-w-input">
                                                        <div class="title">Сума, яку ви будете отримувати. </div>
                                                        <input type="text" 
                                                            [(ngModel)]="psychInfoCopy.familySalary" 
                                                            (blur)="changePrices(1, true); wasChange = true" 
                                                            (keypress)="onNumberInput($event)"
                                                        >
                                                        <div class="sub-title">Ціна враховуючи ваш досвід роботи та підходи</div>
                                                    </div>

                                                    <div class="line"></div>

                                                    <div class="container-w-input">
                                                        <div class="title">Ціна на сеанс що буде відображатись.</div>
                                                        <input type="text" 
                                                            [(ngModel)]="psychInfoCopy.familyPrice" 
                                                            (blur)="changePrices(1, false); wasChange = true" 
                                                            (keypress)="onNumberInput($event)"
                                                        >
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="block-price-session" [class.deactivated] = "true">
                                                <div class="block-price-container">
                                                    <div class="title">Дитяча</div>
                                                    <div class="line"></div>

                                                    <div class="container-w-input">
                                                        <div class="title">Сума, яку ви будете отримувати. </div>
                                                        <input type="text" 
                                                            [(ngModel)]="psychInfoCopy.childrenSalary" 
                                                            (blur)="changePrices(2, true); wasChange = true" 
                                                            (keypress)="onNumberInput($event)"
                                                        >
                                                        <div class="sub-title">Ціна враховуючи ваш досвід роботи та підходи</div>
                                                    </div>

                                                    <div class="line"></div>

                                                    <div class="container-w-input">
                                                        <div class="title">Ціна на сеанс що буде відображатись.</div>
                                                        <input type="text" 
                                                            [(ngModel)]="psychInfoCopy.childrenPrice" 
                                                            (blur)="changePrices(2, false); wasChange = true" 
                                                            (keypress)="onNumberInput($event)"
                                                        >
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    
                                }
                            }

                        </div>

                    </div>

                    <div class="right-side">
                            <!-- <div class="save-img-container">
                                <img src="assets/img/cabinet/test-icon.jpg" alt="">
                                <button>Завантажити нове фото</button>
                            </div> -->
                    </div>

                    
                </div>

                <div class="footer-settings">
                    <div class="edit-footer">
                        <div class="edit-footer-settings">
                            <div class="change-page" [class.active]="activeEditPage == 0" (click)="activeEditPage = 0">Загальная інформація</div>
                            <div class="change-page" [class.active]="activeEditPage == 1" (click)="activeEditPage = 1">Спеціалізація</div>
                            <div class="change-page" [class.active]="activeEditPage == 2" (click)="activeEditPage = 2">Освіта</div>
                            <div class="change-page" [class.active]="activeEditPage == 3" (click)="activeEditPage = 3">Ціна</div>
                        </div>
                        <div class="btns-save">
                            <button (click)="clearChanges()">Очистити</button>
                            <button (click)="saveChanges()">Зберегти</button>
                        </div>
                    </div>
                </div>
            </div>
            }
            @case('open'){

            }
            @default {
                <div class="page-container">
                  <div class="settings-container">

                    <div class="left-side">
                      <div class="block-acc-info">
                        
                        <div class="account-id">
                          <span>Профіль <span>#{{accService.getId()}}</span></span>
                        </div>
                            
                        <div class="block-acc-inputs-container">
                          <div class="block-acc-input">
                            <div class="input-container">
                              <input
                                type="text"
                                [(ngModel)]="firstname"
                                (blur)="changeFirstname()"
                                [style]="{'border-color': firstnameChanged ? '#66BC8F': '#C6C6C6'}"
                              />
                            </div>
                            <label>Ім'я</label>
                          </div>
                          <div class="block-acc-input">
                            <div class="input-container">
                              <input
                                type="text"
                                maxlength="14"
                                [(ngModel)]="lastname"
                                (blur)="changeLastname()"
                                [style]="{'border-color': lastnameChanged ? '#66BC8F': '#C6C6C6'}"
                              />
                            </div>
                            <label>Прізвище</label>
                          </div>
                          <div class="block-acc-input">
                            <div class="country-img">
                              @if(activePhone.length != 0 && !activeFlag){
                              <img
                                src="assets/img/cabinet/settings/not-found-country.svg"
                                alt="not-found-country"
                              />
                              } @else if(activePhone.length != 0) {
                              <span [class]="'fi fi-' + activeFlag"></span>
                              }
                            </div>
                            <div class="input-container">
                              <input
                                type="tel"
                                placeholder="+380000000000"
                                maxlength="13"
                                (keypress)="checkInputPhone($event)"
                                [(ngModel)]="activePhone"
                                (ngModelChange)="onChangePhone()"
                                [style]="{'border-color': phoneChanged ? '#66BC8F': '#C6C6C6'}"
                                (blur)="changePhone()"
                              />
                            </div>
                            <label>Номер телефону</label>
                          </div>
                          <div class="block-acc-input">
                            <div class="input-container">
                              <input
                                type="email"
                                [(ngModel)]="email"
                                [style]="{'border-color': emailChanged ? '#66BC8F': '#C6C6C6'}"
                                (blur)="changeEmail()"
                              />
                            </div>
                            <label>Ел. пошта</label>
                          </div>
                        </div>
                          
                        <div class="block-acc-inputs-container">
                          <div class="block-acc-input">
                            <div class="input-container">
                              <input
                                type="password"
                                maxlength="20"
                                [(ngModel)]="prevPassword"
                                [style]="{'border-color': passwordChanged ? '#66BC8F': '#C6C6C6'}"
                              />
                            </div>
                            <label>Старий пароль</label>
                          </div>
                          <div class="block-acc-input">
                            <div class="input-container">
                              <input
                                [type]="passIsUnlock ? 'text' : 'password'"
                                maxlength="20"
                                [(ngModel)]="newPassword"
                                [style]="{'border-color': passwordChanged ? '#66BC8F': '#C6C6C6'}"
                              />
                              <button (click)="passIsUnlock = !passIsUnlock">
                                <img
                                  [src]="'assets/img/authentication/' + (passIsUnlock ? 'eye-pass-unlock.svg' : 'eye-pass-lock.svg')"
                                  alt="eye-pass"
                                />
                              </button>
                            </div>
                            <label>Новий пароль</label>
                            <div class="err-msg">{{errPassword}}</div>
                          </div>
                        </div>
                          
                        <button (click)="changePassword()" class="change-pass">
                          Змінити пароль
                        </button>
                          
                        <div class="block-notify-settings">
                          <div class="block-notify-top">
                            <div class="left-notify">Повідомлення</div>
                            <div class="right">
                              <div class="right-item">
                                <img
                                  id="mail"
                                  src="assets/img/cabinet/settings/mail-active.svg"
                                  alt=""
                                />
                                <span>Пошта</span>
                              </div>
                              <div class="right-item">
                                <img
                                  id="telegram"
                                  src="assets/img/cabinet/settings/telegram-active.svg"
                                  alt=""
                                />
                                <span>Telegram</span>
                              </div>
                              <div class="right-item">
                                <img
                                  id="site"
                                  src="assets/img/cabinet/settings/site-active.svg"
                                  alt=""
                                />
                                <span>Цей сайт</span>
                              </div>
                            </div>
                          </div>
                          <div class="block-notify-bottom">
                            @for (item of accService.notifySettings; track $index) {
                            <div class="block-item">
                              <div class="left-notify">{{notifyTranslate[item.name]}}</div>
                              <div class="right">
                                <img
                                  id="mail"
                                  (click)="changeNotify($index, 'mail')"
                                  [src]="'assets/img/cabinet/settings/mail-' + (item.mail ? 'active.svg' : 'inactive.svg')"
                                  alt="setting-mail"
                                />
                                <img
                                  id="telegram"
                                  (click)="changeNotify($index, 'telegram')"
                                  [src]="'assets/img/cabinet/settings/telegram-' + (item.telegram ? 'active.svg' : 'inactive.svg')"
                                  alt="setting-telegram"
                                />
                                <img
                                  id="site"
                                  (click)="changeNotify($index, 'site')"
                                  [src]="'assets/img/cabinet/settings/site-' + (item.site ? 'active.svg' : 'inactive.svg')"
                                  alt="setting-site"
                                />
                              </div>
                            </div>
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                        
                    <div class="right-side">
                        <div class="psych-info-container">
                            <!-- <div class="top">

                            </div> -->
                            <div class="bottom">
                                <button class="btn-edit-profile" (click)="navigateToEditProfile()">Редагувати профіль</button>
                                <button class="btn-open-profile" (click)="navigateToOpenProfile()">Відкрити профіль</button>
                            </div>
                        </div>
                    </div>

                  </div>
                </div>

            }
        }
    `,
    styleUrls: ['../cabinet.scss', './settings.scss', './select.scss']
})
export class SettingComponent implements OnInit {
    constructor(protected accService: AccountService, private http: HttpClient, private router: Router,
        private route: ActivatedRoute, protected cabService: CabinetService
    ) { }


    ngOnInit(): void {
        this.firstname = this.accService.data ? this.accService.data.firstname : "";
        this.lastname = this.accService.data ? this.accService.data.lastname : "";
        this.email = this.accService.data ? this.accService.data.email : "";
        this.activePhone = this.accService.data ? this.accService.data.phone : "";

        if(this.accService.role == Role.Psychologist && this.cabService.specializations.length === 0){
            this.http.get(API_URL + 'settings/allAllDataForSettings').subscribe({
                next: (data: any) => {
                    this.cabService.specializations = data.specializations;
                    this.cabService.typeOfTherapies = data.typesOfTherapy;
                }
            })
        }
        this.route.queryParams.subscribe(params => {
            this.settingsPage = params['page'];

            if(!this.settingsPage){
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

            if(this.settingsPage == 'edit'){
                this.resetEducations();
            }
        });
    }
    
    settingsPage = "";

//#region Default page
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
    firstnameChanged = false;
    lastnameChanged = false;
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

    navigateToDefault(){
        this.router.navigate(["cabinet/settings"])
        this.settingsPage = '';
    }
    navigateToEditProfile() {
        this.router.navigate(["cabinet/settings"], { queryParams: { page: "edit" } })
        this.settingsPage = 'edit';
    }
    navigateToOpenProfile() {
        this.router.navigate(["cabinet/settings"], { queryParams: { page: "open" } })
        this.settingsPage = 'open';
    }

    //#region events with server-side
    changeFirstname() {
        if (!this.accService.data) return;
        if (this.firstname === this.accService.data.firstname) return;
        if (this.firstname.length < 3 || !/^[a-zA-Zа-яА-ЯєЄіІїЇґҐ]+$/.test(this.firstname)) {
            this.firstname = this.accService.data.firstname;
            return;
        }

        this.firstname = this.firstname.charAt(0).toUpperCase() + this.firstname.slice(1).toLowerCase();

        const data = {
            id: this.accService.data.id,
            firstname: this.firstname
        }

        this.http.post(API_URL + `settings/changeFirstName`, data, {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        })
            .subscribe({
                next: (data: any) => {
                    if (this.accService.data) {
                        this.firstnameChanged = true;

                        this.accService.data.firstname = this.firstname;
                        this.accService.updateLocalStorage();

                        setTimeout(() => {
                            this.firstnameChanged = false;
                        }, 1000)
                    }
                },
                error: response => {
                    this.firstname = !this.accService.data ? "" : this.accService.data.firstname;
                }
            });
    }
    changeLastname() {
        if (!this.accService.data) return;
        if (this.lastname === this.accService.data.lastname) return;
        if (this.lastname.length < 3 || !/^[a-zA-Zа-яА-ЯєЄіІїЇґҐ]+$/.test(this.lastname)) {
            this.lastname = this.accService.data.lastname;
            return;
        }

        this.lastname = this.lastname.charAt(0).toUpperCase() + this.lastname.slice(1).toLowerCase();

        const data = {
            id: this.accService.data.id,
            lastname: this.lastname
        }

        this.http.post(API_URL + `settings/changeLastName`, data, {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        })
            .subscribe({
                next: (data: any) => {
                    if (this.accService.data) {
                        this.lastnameChanged = true;

                        this.accService.data.lastname = this.lastname;
                        this.accService.updateLocalStorage();

                        setTimeout(() => {
                            this.lastnameChanged = false;
                        }, 1000)
                    }
                },
                error: response => {
                    this.lastname = !this.accService.data ? "" : this.accService.data.lastname;
                }
            });
    }
    changePhone() {
        if (!this.accService.data) return;
        if (this.activePhone === this.accService.data.phone) return;
        if (this.activePhone.length != 13 || !/^\+\d*$/.test(this.activePhone)) {
            this.activePhone = this.accService.data.phone;
            return;
        }

        const data = {
            id: this.accService.data.id,
            phone: this.activePhone
        }

        this.http.post(API_URL + `settings/changePhone`, data, {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        })
            .subscribe({
                next: (data: any) => {
                    this.phoneChanged = true;

                    if (this.accService.data) this.accService.data.phone = this.activePhone;
                    this.accService.updateLocalStorage();

                    setTimeout(() => {
                        this.phoneChanged = false;
                    }, 1000)
                },
                error: response => {
                    this.activePhone = !this.accService.data ? "" : this.accService.data.phone;
                }
            });
    }
    changeEmail() {
        if (!this.accService.data) return;
        if (this.email === this.accService.data.email) return;
        if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]+$/.test(this.email)) {
            this.email = this.accService.data.email;
            return;
        }

        const data = {
            id: this.accService.data.id,
            email: this.email
        }

        this.http.post(API_URL + `settings/changeEmail`, data, {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        })
            .subscribe({
                next: (data: any) => {
                    this.emailChanged = true;

                    if (this.accService.data) this.accService.data.email = this.email;
                    this.accService.updateLocalStorage();

                    setTimeout(() => {
                        this.emailChanged = false;
                    }, 1000)
                },
                error: response => {
                    this.email = !this.accService.data ? "" : this.accService.data.email;
                }
            });
    }
    changePassword() {
        if (!this.accService.data) return;
        if (this.prevPassword === "") return;
        if (this.newPassword.length < 6) {
            this.errPassword = "Мінімальний розмір пароля 6 символів";
            return;
        }

        const data = {
            id: this.accService.data.id,
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
        if (!this.accService.data) return;

        this.http.post(API_URL + `settings/changeNotify`, {
            id: this.accService.data.id,
            index: index,
            event: event
        }, {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        })
            .subscribe({
                next: (data: any) => {
                    switch (event) {
                        case 'mail': this.accService.notifySettings[index].mail = !this.accService.notifySettings[index].mail; break;
                        case 'telegram': this.accService.notifySettings[index].telegram = !this.accService.notifySettings[index].telegram; break;
                        case 'site': this.accService.notifySettings[index].site = !this.accService.notifySettings[index].site; break;
                    }
                    this.accService.updateLocalStorage();
                },
                error: response => {

                }
            });
    }
    //#endregion

//#endregion

//#region Edit page
    activeEditPage = 0;

    psychInfoCopy : PsychInfo = this.copyPsychInfo(); 

    state = 0;
    therapyArr = {
        'Особиста': [
            "Депресивні стани","Дратівливість","Панічні атаки","Самотність","Спроби самогубства","Самооцінка та цінність","Тривожні стани","Втома","Навʼязливі думки","Хімічні залежності","Психосоматика","Ставлення до їжі","Сімейні стосунки","Романтичні стосунки","Інтим та сексуальність","Співзалежність","Емоційне насилля","Емоційне вигорання","Ставлення до грошей","Прокрастинація","Втрата та горе","Адаптація, еміграція","Народження дитини","ПТСР",
        ],
        'Сімейна': [
            "Конфлікти, непорозуміння","Пара на межі розлучення","Емоційне насилля, аб'юз","Виховання дітей",      "Проблеми з комунікацією","Інтим та сексуальні стосунки","Зрада","Будування особистих меж","Співзалежність","Стосунки на відстані","Перервана вагітність","Проблеми з довірою",
        ],
        'Дитяча': [
            "Страхи чи фобії","Надмірна агресивність","Діти з особл. потребами","Втрата близьких","Адаптація","Булінг","Самотність","РДУГ","Тривожні стани","Депресивні стани","Cамооцінка","ПТСР","Поведінкові залежності","Спроби самогубства","Емоційне насилля","Прокрастинація","Інтим та сексуальність","Психосоматика","Розлади харчування","Навʼязливі думки","Розлади особистості",
        ]
    }
    educations: Education[] = [];
    wasChange = false;
    
    clearChanges(){
        this.psychInfoCopy = this.copyPsychInfo();
        this.year = this.psychInfoCopy.year?.toString();
        this.wasChange = false;
        this.resetEducations();
    }
    saveChanges(){
        if(!this.wasChange) return;

        if(!confirm("Ви впевнені, що хочете змінити дані фахівця, адміністратору знову доведеться активувати ваш аккаунт?")) return;

        this.psychInfoCopy.educations = this.educations.filter(i => i.faculty != '' || i.university != '' || i.year != null);

        this.http.post(API_URL + `settings/sendChangesPsychInfo`, this.psychInfoCopy, {
            headers: new HttpHeaders({'Content-Type':'application/json'})
        })
        .subscribe({
            next: (accDto : any) => {
                localStorage.setItem("AccountData", JSON.stringify(accDto));
                this.accService.loadData();
                this.navigateToDefault();
                this.wasChange = false;
                alert("Ваші дані набули чинності, чекайте коли адміністратор активує вам аккаунт.");
                //this.copyPsychInfo();
            },
            error: (response : any) => {
                this.clearChanges();
                console.error(response);
            }
        })
    }
    copyPsychInfo() : PsychInfo{
        let retObj = { ...this.accService.psychInfo };
        retObj.languages = [...this.accService.psychInfo.languages]
        retObj.specializations = [...this.accService.psychInfo.specializations]
        retObj.typesOfTherapy = [...this.accService.psychInfo.typesOfTherapy]
        retObj.educations = [...this.accService.psychInfo.educations]
        return retObj;
    }

    buttonStyle(therapyState : boolean) : {[key:string]: boolean} {
        return {
            'active': therapyState,
            'deactive': !therapyState
        }
    }

    resetEducations(){
        this.educations = [];
        const maxlength = 6;

        for (let index = 0; index < this.psychInfoCopy.educations.length; index++) {
            if(index + 1 > maxlength) break;
            
            const education = this.psychInfoCopy.educations[index];
            
            this.educations.push({
                university: education.university,
                faculty: education.faculty,
                year: education.year,
            })
        }
        if(this.educations.length < maxlength){
            let addLength = maxlength - this.educations.length;
            for (let index = 0; index < addLength; index++) {
                this.educations.push({
                    university: '',
                    faculty: '',
                    year: null,
                })
            }
        }
    }
    moveFocus(index: number) {
        if(index === 0) return;
        const prevIndex = index - 1;
        const prevEducation = this.educations[prevIndex];

        if (prevEducation.university == '' && prevEducation.faculty == '' && prevEducation.year == null) {
            const prevInputs = document.getElementById(`education-${prevIndex}:1`) as HTMLInputElement;
            prevInputs.focus();
        }
    }

    //#region checker & changer
    checkSpecialization(id : number) : boolean | undefined{
        return this.psychInfoCopy.specializations.some(i => i.id == id);
    }
    setSpecialization(spec : Specialization){
        const index = this.psychInfoCopy.specializations.findIndex(s => s.id == spec.id);
        if(index != -1){
            this.psychInfoCopy.specializations.splice(index, 1);
        } else {
            this.psychInfoCopy.specializations.push(spec);
        }
    }

    checkLang(lang : string){
        return this.psychInfoCopy.languages.some(i => i == lang);
    }
    setLang(lang : string){
        const index = this.psychInfoCopy.languages.findIndex(i => i == lang);
        if(index != -1){
            this.psychInfoCopy.languages.splice(index, 1);
        } else {
            this.psychInfoCopy.languages.push(lang);
        }
    }

    checkMeet(type : string) : boolean | undefined {
        switch(type){
            case 'online': return this.psychInfoCopy.onlineMeet;
            case 'intramural' : return this.psychInfoCopy.intramuralMeet;
            default: return false;
        }
    }
    setMeet(type : string){
        if(type === 'online'){
            this.psychInfoCopy.onlineMeet = !this.psychInfoCopy.onlineMeet;
        } else if(type === 'intramural'){
            this.psychInfoCopy.intramuralMeet = !this.psychInfoCopy.intramuralMeet;
        }
    }

    containsTherapyTypeByName(name : string) : boolean {
        return this.psychInfoCopy.typesOfTherapy.some(i => i['name'] == name);
    }
    setTherapyType(name : string){
        const index = this.psychInfoCopy.typesOfTherapy.findIndex(i => i['name'] === name);
        if(index != -1){
            this.psychInfoCopy.typesOfTherapy.splice(index, 1);
        } else {
            let typeOfTh = this.cabService.typeOfTherapies.find(i => i.name.toLocaleLowerCase() == name.toLocaleLowerCase());
            if(!typeOfTh) return;
            this.psychInfoCopy.typesOfTherapy.push(typeOfTh)
        }
    }
    //#endregion

    //#region methonds with prices
    onNumberInput(event: KeyboardEvent){
        if(isNaN(Number(event.key))) event.preventDefault();
    }
    getSalaryByType(type : number) : 'personalSalary' | 'familySalary' | 'childrenSalary' {
        if(type === 0){
            return 'personalSalary';
        } else if(type === 1){
            return 'familySalary';
        } else {
            return 'childrenSalary';
        } 
    }
    getPriceByType(type : number) : 'personalPrice' | 'familyPrice' | 'childrenPrice' {
        if(type === 0){
            return 'personalPrice';
        } else if(type === 1){
            return 'familyPrice';
        } else {
            return 'childrenPrice';
        } 
    }
    changePrices(index: number, isSalary: boolean){
        let coef = 0.3;
        let minCommission = 250;

        let salary = this.getSalaryByType(index);
        let price = this.getPriceByType(index);

        this.psychInfoCopy[salary] = Number(this.psychInfoCopy[salary])
        this.psychInfoCopy[price] = Number(this.psychInfoCopy[price])

        if(isSalary){
            this.psychInfoCopy[price] = 0;

            let checkMinComm = this.psychInfoCopy[salary] + minCommission;
            
            if(checkMinComm * 0.3 < 250){
                this.psychInfoCopy[price] = this.psychInfoCopy[salary] + 250;
            } else {
                this.psychInfoCopy[price] = Math.trunc(this.psychInfoCopy[salary] / (1 - coef))
            }
        } else {
            this.psychInfoCopy[salary] = 0;

            if(this.psychInfoCopy[price] < minCommission)
            {
                this.psychInfoCopy[price] = minCommission;
                return
            }
            const commission = Math.trunc(this.psychInfoCopy[price] * coef);

            if(commission < minCommission){
                this.psychInfoCopy[salary] = this.psychInfoCopy[price] - minCommission;
            } else {
                this.psychInfoCopy[salary] = this.psychInfoCopy[price] - commission;
            }
        }
    }
    //#endregion

//#endregion

//#region inpit-number
    year : string | null | undefined = this.psychInfoCopy.year?.toString();

    checkCorrectYear(e: any) {
        if (!/^([0-9][0-9]?)(\.([0-9][0-9]?)?)?$/.test(e.key)) e.preventDefault()
        this.wasChange = true;
    }
    addYear() {
        let num = Number(this.year);
        if (Number.isNaN(num)) num = 20;

        let add = (++num).toString()
        if (add.length > 3) return;

        this.year = add;
        this.psychInfoCopy.year = Number(this.year)
    }
    delYear() {
        let num = Number(this.year);
        if (Number.isNaN(num)) num = 20;

        if (num - 1 < 0) return;

        let add = (--num).toString()

        this.year = add;
        this.psychInfoCopy.year = Number(this.year)
    }
//#endregion


}



