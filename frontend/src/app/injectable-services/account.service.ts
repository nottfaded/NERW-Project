import { Injectable } from '@angular/core';

export enum Role{
  Clien = 1, Psychologist
}

@Injectable({
  providedIn: 'root',
})
export class AccountData{
  data: User | null = null;
  notifySettings: NotifySetting[] = [];
  role : number = 0;
  // user: User | null = null;

  constructor(){
    this.getData();
  }

  getData(){
    const accData = localStorage.getItem("accountData");
    if(accData){
      const data = JSON.parse(accData);
      this.data = new User(data.id, data.name, data.surname, data.email, data.phone);
      this.role = data.role;
      this.notifySettings = data.notifySettings;
    }
  }

  getId(){
    if(!this.data) return "Error";

    switch(this.role)
    {
      case 1: return `U${this.data.id}`
      case 2: return `P${this.data.id}`
      default: return "Error";
    }
  }

  updateLocalStorage(){
    if(!this.data) return;
    localStorage.setItem("accountData", JSON.stringify({
      id: this.data.id,
      name: this.data.firstName,
      surname: this.data.lastName,
      email: this.data.email,
      role: this.role,
      notifySettings: this.notifySettings,
      phone: this.data.phone
    }))
  }

  logOut(){
    localStorage.removeItem("accessToken")
    localStorage.removeItem("accountData");
    this.data = null;
  }
    
}

class User{
  id: number = -1;
  firstName: string = "";
  lastName: string = "";
  email: string = "";
  phone: string = "";

  constructor(id: number, fname : any, lname : any, email: any, phone: string){
    this.id = id;
    this.firstName = fname;
    this.lastName = lname;
    this.email = email;
    this.phone = phone;
  }
}

interface NotifySetting{
  name: string;
  mail: boolean;
  telegram: boolean;
  site: boolean;
}