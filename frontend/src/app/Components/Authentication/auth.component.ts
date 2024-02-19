import { Component } from "@angular/core";
import { ThemeService } from "../../injectable-services/theme.service";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URL } from "../../../main";
import { AccountData } from "../../injectable-services/account.service";

@Component({
  selector: "auth-page",
  template: `
    
    <div class="background-img" [style.filter]="forgerPassStatus != 0 ? 'blur(0.544069640914037vh)' : 'none'"></div>
    
    @if(forgerPassStatus != 0){<div class="forget-pass-background"></div>}
    
    <div class="auth">

      <div class="company-name" [style.filter]="forgerPassStatus != 0 ? 'blur(0.544069640914037vh)' : 'none'">
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
          <path d="M20 40C31.0457 40 40 31.0457 40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40Z" fill="#66BC8F"/>
          <path d="M19.92 32C26.5032 32 31.84 26.6632 31.84 20.08C31.84 13.4968 26.5032 8.16 19.92 8.16C13.3368 8.16 8 13.4968 8 20.08C8 26.6632 13.3368 32 19.92 32Z" fill="white"/>
          <path d="M37.4601 39.1314C37.5587 39.6141 37.0979 40.0226 36.6305 39.8667L29.9268 37.6308C29.4595 37.4749 29.3361 36.8715 29.7048 36.5447L34.993 31.8571C35.3617 31.5303 35.9459 31.7252 36.0446 32.2079L37.4601 39.1314Z" fill="#66BC8F"/>
          <path d="M9.00779 31.7254C8.5345 31.8622 8.09057 31.4354 8.20872 30.9571L9.3957 26.1517C9.51384 25.6734 10.1055 25.5024 10.4606 25.8438L14.0287 29.2745C14.3838 29.6159 14.2362 30.2138 13.7629 30.3506L9.00779 31.7254Z" fill="white"/>
        </svg>
        <span>Talkind</span>
      </div>

      <div class="quote" [style.filter]="forgerPassStatus != 0 ? 'blur(0.544069640914037vh)' : 'none'">
        <span><i>{{quotes[activeQuote][0]}}</i> {{quotes[activeQuote][1]}}</span>
      </div>

      @switch (forgerPassStatus) {
        @case (1) {
          <div class="block forget-pass" [style.height]="'69.64091403699673vh'" [style.z-index]="'1'">
            <div class="block-container">
              <div class="block-title">
                <div class="block-title-name">Відновлення паролю</div>
                <div class="block-title-text">Коли ви введете свій email та натиснете "Відновити", на вказаний email прийде лист з новим паролем. Після входу за новим паролем ви зможете змінити його в налаштуваннях</div>
              </div>
        
              <div class="block-inputs-container">
                <div>
                  <input type="text" [(ngModel)]="email" (ngModelChange)="setValidEmail()" [ngClass]="{'correct-input': validEmail}">
                  <label>Ел. пошта</label>
                </div>
              </div>

              <div class="auth-pass-err">
                <div>{{errorMsg}}</div>
                <div></div>
              </div>
                
              <div class="block-buttons" [style.margin-top]="'3.808487486398259vh'">
                <button (click)="forgetPassword()">
                  <div>Відновити пароль</div>
                  <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="15" viewBox="0 0 30 15" fill="none">
                      <path d="M29.8778 6.90982C29.8747 6.90262 29.8709 6.8957 29.8678 6.88857C29.852 6.85348 29.8358 6.81868 29.8172 6.78461C29.803 6.75819 29.787 6.73293 29.7712 6.70745C29.7627 6.69369 29.755 6.67957 29.7459 6.66603C29.6776 6.56354 29.5972 6.46956 29.5064 6.38612L23.5263 0.443608C22.931 -0.147869 21.9694 -0.147869 21.3741 0.443608C20.7788 1.03509 20.7788 1.99055 21.3741 2.58203L24.792 5.97875L1.52634 5.97816C0.686865 5.97816 0 6.66064 0 7.49475C0 8.32893 0.686865 9.01133 1.52634 9.01133L24.792 9.01184L21.3603 12.4217C20.7649 13.0132 20.7649 13.9687 21.3603 14.5602C21.6655 14.8483 22.047 15 22.4439 15C22.8408 15 23.2223 14.8483 23.5276 14.5602L29.5543 8.57208C30.0075 8.12175 30.1146 7.46083 29.8778 6.90982Z" fill="white"/>
                    </svg>
                  </div>
                </button>
                <button (click)="forgerPassStatus = 0">Згадали пароль? Увійти</button>
              </div>
            </div>
        
            <div class="footer">
              <div class="footer-buttons">
                <div class="btns-title">
                  Служба підтримки:
                </div>
                <div class="btns">
                    <a href=""><img src="assets/img/social/icon-instagram.svg" alt="icon-instagram"></a>
                    <a href=""><img src="assets/img/social/icon-telegram.svg" alt="icon-telegram"></a>
                    <a href=""><img src="assets/img/social/icon-facebook.svg" alt="icon-facebook"></a>
                </div>
              </div>
              <div class="footer-link-back" [routerLink]="['/']">
                <svg xmlns="http://www.w3.org/2000/svg" width="9" height="15" viewBox="0 0 9 15" fill="none">
                  <path d="M1 8.25354L8.29353 1M8.02888 14.5895L1.14648 7.70711" stroke="#444444"/>
                </svg>
                На головну
              </div>
            </div>
          </div>
        }
        @case(2){
          <div class="block forget-pass" [style.height]="'69.64091403699673vh'" [style.z-index]="'1'">
            <div class="block-container">
              <div class="block-title">
                <div class="block-title-name">Відновлення паролю</div>
                <div class="block-title-text">Введіть код з листа на пошті, що прийде протягом 5 хвилин. Якщо лист не відображається, перевірте папку Спам.</div>
              </div>
        
              <div class="block-inputs-container">
                <div>
                  <input type="text" [(ngModel)]="repairCode"  
                  [ngClass]="{'correct-input': repairCode.length == 6}"
                  (keypress)="checkInputRepairCode($event)">
                  <label>Код</label>
                </div>
              </div>

              <div class="auth-pass-err">
                <div>{{errorMsg}}</div>
                <div></div>
              </div>
                
              <div class="block-buttons" [style.margin-top]="'3.808487486398259vh'">
                <button (click)="entryRepairCode()">
                  <div>Підтвердити</div>
                  <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="15" viewBox="0 0 30 15" fill="none">
                      <path d="M29.8778 6.90982C29.8747 6.90262 29.8709 6.8957 29.8678 6.88857C29.852 6.85348 29.8358 6.81868 29.8172 6.78461C29.803 6.75819 29.787 6.73293 29.7712 6.70745C29.7627 6.69369 29.755 6.67957 29.7459 6.66603C29.6776 6.56354 29.5972 6.46956 29.5064 6.38612L23.5263 0.443608C22.931 -0.147869 21.9694 -0.147869 21.3741 0.443608C20.7788 1.03509 20.7788 1.99055 21.3741 2.58203L24.792 5.97875L1.52634 5.97816C0.686865 5.97816 0 6.66064 0 7.49475C0 8.32893 0.686865 9.01133 1.52634 9.01133L24.792 9.01184L21.3603 12.4217C20.7649 13.0132 20.7649 13.9687 21.3603 14.5602C21.6655 14.8483 22.047 15 22.4439 15C22.8408 15 23.2223 14.8483 23.5276 14.5602L29.5543 8.57208C30.0075 8.12175 30.1146 7.46083 29.8778 6.90982Z" fill="white"/>
                    </svg>
                  </div>
                </button>
                <button (click)="forgetPassword()">Відправити знову</button>
              </div>
            </div>
        
            <div class="footer">
              <div class="footer-buttons">
                <div class="btns-title">
                  Служба підтримки:
                </div>
                <div class="btns">
                    <a href=""><img src="assets/img/social/icon-instagram.svg" alt="icon-instagram"></a>
                    <a href=""><img src="assets/img/social/icon-telegram.svg" alt="icon-telegram"></a>
                    <a href=""><img src="assets/img/social/icon-facebook.svg" alt="icon-facebook"></a>
                </div>
              </div>
              <div class="footer-link-back" [routerLink]="['/']">
                <svg xmlns="http://www.w3.org/2000/svg" width="9" height="15" viewBox="0 0 9 15" fill="none">
                  <path d="M1 8.25354L8.29353 1M8.02888 14.5895L1.14648 7.70711" stroke="#444444"/>
                </svg>
                На головну
              </div>
            </div>
          </div>
        }
        @case(3){
          <div class="block forget-pass" [style.height]="'69.64091403699673vh'" [style.z-index]="'1'">
            <div class="block-container">
              <div class="block-title">
                <div class="block-title-name">Відновлення паролю</div>
                <div class="block-title-text">Придумайте новий пароль. Мінімальна довжина 6 символів.</div>
              </div>
        
              <div class="block-inputs-container">
                <div>
                  <input maxlength="20" [type]="passIsUnlock ? 'text' : 'password'" [(ngModel)]="password" (ngModelChange)="setValidPassword()"
                  [ngClass]="{
                    'incorrect-input': password.length > 0 && !validPassword,
                    'correct-input': validPassword
                  }">
                  <label>Новий пароль</label>
                  <div (click)="passIsUnlock = !passIsUnlock"><img [src]="'assets/img/authentication/' + (passIsUnlock ? 'eye-pass-unlock.svg' : 'eye-pass-lock.svg')" alt="eye-pass"></div>
                </div>
                <div>
                  <input type="password" [(ngModel)]="repeatPassword" 
                  (ngModelChange)="setValidRepeatPassword()" 
                  [ngClass]="{
                    'incorrect-input': repeatPassword.length > 0 && !validRepeatPassword,
                    'correct-input': repeatPassword.length > 0 && validRepeatPassword
                    }">
                  <label>Повторити пароль</label>
                </div>
              </div>

              <div class="auth-pass-err">
                <div>{{errorMsg}}</div>
                <div></div>
              </div>
                
              <div class="block-buttons" [style.margin-top]="'3.808487486398259vh'">
                <button (click)="changePassword()">
                  <div>Змінити пароль</div>
                  <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="15" viewBox="0 0 30 15" fill="none">
                      <path d="M29.8778 6.90982C29.8747 6.90262 29.8709 6.8957 29.8678 6.88857C29.852 6.85348 29.8358 6.81868 29.8172 6.78461C29.803 6.75819 29.787 6.73293 29.7712 6.70745C29.7627 6.69369 29.755 6.67957 29.7459 6.66603C29.6776 6.56354 29.5972 6.46956 29.5064 6.38612L23.5263 0.443608C22.931 -0.147869 21.9694 -0.147869 21.3741 0.443608C20.7788 1.03509 20.7788 1.99055 21.3741 2.58203L24.792 5.97875L1.52634 5.97816C0.686865 5.97816 0 6.66064 0 7.49475C0 8.32893 0.686865 9.01133 1.52634 9.01133L24.792 9.01184L21.3603 12.4217C20.7649 13.0132 20.7649 13.9687 21.3603 14.5602C21.6655 14.8483 22.047 15 22.4439 15C22.8408 15 23.2223 14.8483 23.5276 14.5602L29.5543 8.57208C30.0075 8.12175 30.1146 7.46083 29.8778 6.90982Z" fill="white"/>
                    </svg>
                  </div>
                </button>
                <button [style.display]="'none'"></button>
              </div>
            </div>
        
            <div class="footer">
              <div class="footer-buttons">
                <div class="btns-title">
                  Служба підтримки:
                </div>
                <div class="btns">
                    <a href=""><img src="assets/img/social/icon-instagram.svg" alt="icon-instagram"></a>
                    <a href=""><img src="assets/img/social/icon-telegram.svg" alt="icon-telegram"></a>
                    <a href=""><img src="assets/img/social/icon-facebook.svg" alt="icon-facebook"></a>
                </div>
              </div>
              <div class="footer-link-back" [routerLink]="['/']">
                <svg xmlns="http://www.w3.org/2000/svg" width="9" height="15" viewBox="0 0 9 15" fill="none">
                  <path d="M1 8.25354L8.29353 1M8.02888 14.5895L1.14648 7.70711" stroke="#444444"/>
                </svg>
                На головну
              </div>
            </div>
          </div>
        }
        @default {
          @if(isReg){
            <div class="block">
              <div class="block-container">
                <div class="block-title">
                  <div class="block-title-name">Реєстрація</div>
                  <div class="block-title-text">Створюючи аккаунт ти маєш можливість відслідковувати свої сесії та бронювати сеанси більш ніж за 24 години без оплати.</div>
                </div>
            
                <div class="block-inputs-container">
                  <div>
                    <input type="text" [(ngModel)]="name" (ngModelChange)="setValidName()" (keypress)="checkInputName($event)"
                    [ngClass]="{
                      'incorrect-input': name.length > 0 && !validName,
                      'correct-input': validName
                    }">
                    <label>Ім'я</label>
                  </div>
                  <div>
                    <input type="text" [(ngModel)]="email" (ngModelChange)="setValidEmail()" 
                    [ngClass]="{
                      'incorrect-input': email.length > 0 && !validEmail,
                      'correct-input': validEmail
                    }">
                    <label>Ел. пошта</label>
                  </div>
                  <div>
                    <input maxlength="20" [type]="passIsUnlock ? 'text' : 'password'" [(ngModel)]="password" (ngModelChange)="setValidPassword()"
                    [ngClass]="{
                      'incorrect-input': password.length > 0 && !validPassword,
                      'correct-input': validPassword
                    }">
                    <label>Новий пароль</label>
                    <div (click)="passIsUnlock = !passIsUnlock"><img [src]="'assets/img/authentication/' + (passIsUnlock ? 'eye-pass-unlock.svg' : 'eye-pass-lock.svg')" alt="eye-pass"></div>
                  </div>
                </div>
                  
                <div class="text-policy">
                  Натискаючи кнопку "Створити аккаунт", ти даєш згоду на обробку своїх персональних даних, та приймаєш наші <span>Правила використання сайту</span>.
                </div>
                  
                <div class="block-buttons" (click)="createAccount()">
                  <button>
                    <div>Створити аккаунт</div>
                    <div>
                      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="15" viewBox="0 0 30 15" fill="none">
                        <path d="M29.8778 6.90982C29.8747 6.90262 29.8709 6.8957 29.8678 6.88857C29.852 6.85348 29.8358 6.81868 29.8172 6.78461C29.803 6.75819 29.787 6.73293 29.7712 6.70745C29.7627 6.69369 29.755 6.67957 29.7459 6.66603C29.6776 6.56354 29.5972 6.46956 29.5064 6.38612L23.5263 0.443608C22.931 -0.147869 21.9694 -0.147869 21.3741 0.443608C20.7788 1.03509 20.7788 1.99055 21.3741 2.58203L24.792 5.97875L1.52634 5.97816C0.686865 5.97816 0 6.66064 0 7.49475C0 8.32893 0.686865 9.01133 1.52634 9.01133L24.792 9.01184L21.3603 12.4217C20.7649 13.0132 20.7649 13.9687 21.3603 14.5602C21.6655 14.8483 22.047 15 22.4439 15C22.8408 15 23.2223 14.8483 23.5276 14.5602L29.5543 8.57208C30.0075 8.12175 30.1146 7.46083 29.8778 6.90982Z" fill="white"/>
                      </svg>
                    </div>
                  </button>
                  <button (click)="navigateToAuthReg()">Увійти в існуючий аккаунт</button>
                </div>
              </div>
                  
              <div class="footer">
                <div class="footer-buttons">
                  <div class="btns-title">
                    Служба підтримки:
                  </div>
                  <div class="btns">
                      <a href=""><img src="assets/img/social/icon-instagram.svg" alt="icon-instagram"></a>
                      <a href=""><img src="assets/img/social/icon-telegram.svg" alt="icon-telegram"></a>
                      <a href=""><img src="assets/img/social/icon-facebook.svg" alt="icon-facebook"></a>
                  </div>
                </div>
                <div class="footer-link-back" [routerLink]="['/']">
                  <svg xmlns="http://www.w3.org/2000/svg" width="9" height="15" viewBox="0 0 9 15" fill="none">
                    <path d="M1 8.25354L8.29353 1M8.02888 14.5895L1.14648 7.70711" stroke="#444444"/>
                  </svg>
                  На головну
                </div>
              </div>
            </div>
          }
          @else {
            <div class="block" [style.height]="'69.64091403699673vh'">
              <div class="block-container">
                <div class="block-title">
                  <div class="block-title-name">Вхід</div>
                </div>
          
                <div class="block-inputs-container">
                  <div>
                    <input type="text" [(ngModel)]="email" (ngModelChange)="setValidEmail()">
                    <label>Ел. пошта</label>
                  </div>
                  <div>
                    <input maxlength="20" [type]="passIsUnlock ? 'text' : 'password'" [(ngModel)]="password" (ngModelChange)="setValidPassword()">
                    <label>Новий пароль</label>
                    <div (click)="passIsUnlock = !passIsUnlock"><img [src]="'assets/img/authentication/' + (passIsUnlock ? 'eye-pass-unlock.svg' : 'eye-pass-lock.svg')" alt="eye-pass"></div>
                  </div>
                </div>
          
                <div class="auth-pass-err">
                  <div>{{errorMsg}}</div>
                  <div (click)="forgerPassStatus = 1;resetAllVariables()">Забули пароль?</div>
                </div>
          
                <div class="block-buttons">
                  <button (click)="logIn()">
                    <div>Увійти</div>
                    <div>
                      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="15" viewBox="0 0 30 15" fill="none">
                        <path d="M29.8778 6.90982C29.8747 6.90262 29.8709 6.8957 29.8678 6.88857C29.852 6.85348 29.8358 6.81868 29.8172 6.78461C29.803 6.75819 29.787 6.73293 29.7712 6.70745C29.7627 6.69369 29.755 6.67957 29.7459 6.66603C29.6776 6.56354 29.5972 6.46956 29.5064 6.38612L23.5263 0.443608C22.931 -0.147869 21.9694 -0.147869 21.3741 0.443608C20.7788 1.03509 20.7788 1.99055 21.3741 2.58203L24.792 5.97875L1.52634 5.97816C0.686865 5.97816 0 6.66064 0 7.49475C0 8.32893 0.686865 9.01133 1.52634 9.01133L24.792 9.01184L21.3603 12.4217C20.7649 13.0132 20.7649 13.9687 21.3603 14.5602C21.6655 14.8483 22.047 15 22.4439 15C22.8408 15 23.2223 14.8483 23.5276 14.5602L29.5543 8.57208C30.0075 8.12175 30.1146 7.46083 29.8778 6.90982Z" fill="white"/>
                      </svg>
                    </div>
                  </button>
                  <button (click)="navigateToAuthReg()">Ще немає аккаунту? Створити новий</button>
                </div>
              </div>
          
              <div class="footer">
                <div class="footer-buttons">
                  <div class="btns-title">
                    Служба підтримки:
                  </div>
                  <div class="btns">
                      <a href=""><img src="assets/img/social/icon-instagram.svg" alt="icon-instagram"></a>
                      <a href=""><img src="assets/img/social/icon-telegram.svg" alt="icon-telegram"></a>
                      <a href=""><img src="assets/img/social/icon-facebook.svg" alt="icon-facebook"></a>
                  </div>
                </div>
                <div class="footer-link-back" [routerLink]="['/']">
                  <svg xmlns="http://www.w3.org/2000/svg" width="9" height="15" viewBox="0 0 9 15" fill="none">
                    <path d="M1 8.25354L8.29353 1M8.02888 14.5895L1.14648 7.70711" stroke="#444444"/>
                  </svg>
                  На головну
                </div>
              </div>
            </div>
          }
        }
      }
      
    </div>
    `,
  styleUrls: ['./auth.scss'],
  
})

export class AuthComponent {
  forgerPassStatus = 0;
  quotes: string[][] = [
    ["Є тільки один шлях до щастя: подолати занепокоєння про те, що ми не в силах змінити.", "Епіктет"],
    ["Кожен женеться за щастям, не помічаючи, що щастя ходить за ними по п’ятах.", "Бертольд Брехт"]
  ]
  activeQuote = 0;
  
  isReg: boolean = true;

  passIsUnlock: boolean = false;
  errorMsg: string = '';

  name = "";
  validName = false;
  email = "";
  validEmail = false;
  password = "";
  validPassword = false;

  repairCode = "";
  repeatPassword = "";
  validRepeatPassword = false;

  constructor(protected themeService: ThemeService, private route: ActivatedRoute, private router: Router, private http: HttpClient,
    protected account : AccountData) 
  {
    route.queryParams.subscribe((params) => {
      if(!params['type'] || (params['type'] != 'authorization' && params['type'] != 'registration')){
        this.router.navigate(['/auth'], { queryParams: { type: "authorization" } });
      }else{
        this.isReg = params['type'] !== 'authorization';
      }
    });
    this.generateQuote();
  }

  generateQuote(){
    this.activeQuote = Math.floor(Math.random() * this.quotes.length);
  }

  //#region auth func
  setValidName(){
    this.validName = this.name.length >= 3 && /^[a-zA-Zа-яА-ЯєЄіІїЇґҐ]+$/.test(this.name);
  }
  setValidEmail(){
    this.validEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]+$/.test(this.email);
  }
  setValidPassword(){
    this.validPassword = this.password.length >= 6;
  }
  //#endregion

  setValidRepeatPassword(){
    this.validRepeatPassword = this.repeatPassword.length > 0 && this.password.length > 0 && this.repeatPassword == this.password;
  }

  navigateToAuthReg() {
    this.isReg = !this.isReg;
    const type = this.isReg ? 'registration' : 'authorization';
    this.resetAllVariables();
    this.router.navigate(['/auth'], { queryParams: { type: type } });
    this.generateQuote();
  }
  resetAllVariables(){
    this.name = "";
    this.validName = false;
    this.email = "";
    this.validEmail = false;
    this.password = "";
    this.validPassword = false;
    this.passIsUnlock = false;
    this.errorMsg = "";
  }

  //#region registration
  checkInputName(e: any) {
    if (!/^[a-zA-Zа-яА-ЯєЄіІїЇґҐ]+$/.test(e.key)) e.preventDefault();
  }
  isCanReg() {
    return this.validName && this.validEmail && this.validPassword;
  }
  //#endregion
  checkInputRepairCode(e: any) {
    if (!/^[0-9]/.test(e.key) || this.repairCode.length == 6) e.preventDefault();
  }

  createAccount() {
    if(!this.isCanReg()) return;
    const acccountData = {
      'Email': this.email,
      'Password': this.password,
      'Name': this.name.charAt(0).toUpperCase() + this.name.slice(1).toLowerCase(),
    };
    this.http.post(API_URL + 'accounts/create', acccountData, { 
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }) 
    })
    .subscribe({
      next: (data: any) => {
        this.navigateToAuthReg();
      },
      error: er => {
        console.log(er)
      }
    });
  }

  logIn() {
    if(!this.validEmail) {
      this.errorMsg = "Неправильний формат для електронної пошти."
      return;
    }
    if(!this.validPassword){
      this.errorMsg = "Невірний пароль."
      return;
    }

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
        localStorage.setItem("accountData", JSON.stringify(data.accData));
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
        // console.log(response)
      }
    });
  }
  forgetPassword(){
    if(!this.validEmail) return;

    this.http.post(API_URL + `accounts/forgetPassword`, `"${this.email}"`, { 
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }) 
    })
    .subscribe({
      next: (data: any) => {
        this.forgerPassStatus = 2;
        this.errorMsg = "";
      },
      error: response => {
        if(response.status === 404)
        {
          this.errorMsg = "Користувач із зазначеним email не знайдено.";
        }
        else if(response.status === 400)
        {
          this.errorMsg = "Спробуйте через 2 хвилини.";
        }
      }
    });
  }
  entryRepairCode(){
    if(this.repairCode.length !== 6) return

    this.http.post(API_URL + `accounts/checkRepairCode`, 
    {
      "Email": this.email,
      "Code": this.repairCode
    }, { 
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }) 
    })
    .subscribe({
      next: (data: any) => {
        this.forgerPassStatus = 3;
        this.errorMsg = "";
      },
      error: response => {
        if(response.status === 400)
        {
          if(typeof response.error === 'object'){
            this.errorMsg = "Щось трапилось не так";
            // for (const iterator of response.error.errors) {
            //   console.log(iterator, 'color: red;');
            // }
          } else {
            this.errorMsg = response.error;
          }
        }
      }
    });
  }
  changePassword(){
    if(!this.validPassword || !this.validRepeatPassword) return;
    
    this.http.post(API_URL + `accounts/changePassword`, 
    {
      "Email": this.email,
      "NewPassword": this.password
    }, { 
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }) 
    })
    .subscribe({
      next: (data: any) => {
        this.forgerPassStatus = 0;
        this.resetAllVariables();
      },
      error: response => {
        
      }
    });
  }


}