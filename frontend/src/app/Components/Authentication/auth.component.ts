import { Component } from "@angular/core";
import { ThemeService } from "../../injectable-services/theme.service";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URL } from "../../../main";
import { AccountService } from "../../injectable-services/account.service";
import { CabinetService } from "../../injectable-services/cabinet.service";

@Component({
  selector: "auth-page",
  templateUrl: `./auth.html`,
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
    protected account : AccountService, private cabSerive: CabinetService) 
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
        localStorage.setItem("AccountData", JSON.stringify(data.accDto));
        this.account.loadData();
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