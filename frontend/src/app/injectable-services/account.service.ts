import { Injectable } from '@angular/core';
import { Specialization } from './cabinet.service';
import { Education } from '../models/education';
import { TypeOfTherapy } from '../models/typeOfTherapy';

export enum Role{
  Client = 1, Partner, Psychologist, Admin
}

@Injectable({ providedIn: 'root' })
export class AccountService{
  data: User | null = null;
  notifySettings: NotifySetting[] = [];
  role : number = 0;
  psychInfo : PsychInfo = {
    id: -1,
    allCountSession: 0,
    year: null,
    intramuralMeet: false,
    onlineMeet: false,
    city: null,
    address: null,
    personalPrice: 250,
    personalSalary: 0,
    familyPrice: 250,
    familySalary: 0,
    childrenPrice: 250,
    childrenSalary: 0,
    languages: [],
    specializations: [],
    personalTherapy: false,
    familyTherapy: false,
    childrenTherapy: false,
    typesOfTherapy: [],
    educations: []
  };
  // user: User | null = null;

  constructor(){
    this.loadData();
  }

  loadData(){
    const accData = localStorage.getItem("AccountData");
    if(accData){
      const data = JSON.parse(accData);
      this.data = {
        id: data.id, 
        firstname: data.firstname, 
        lastname: data.lastname, 
        email: data.email, 
        phone: data.phone
      };
      this.role = data.role;
      this.notifySettings = data.notifySettings;
      this.psychInfo = data.psychInfo;

      // if(this.psychInfo.educations.length > 6){
      //   this.psychInfo.educations = this.psychInfo.educations.splice(0, 6);
      // } else {

      // }

    }
  }

  getId(){
    if(!this.data) return "Error";

    switch(this.role)
    {
      case Role.Client: return `U${this.data.id}`
      case Role.Psychologist: return `P${this.data.id}`
      default: return "Error";
    }
  }

  updateLocalStorage(){
    if(!this.data) return;
    localStorage.setItem("AccountData", JSON.stringify({
      id: this.data.id,
      firstname: this.data.firstname,
      lastname: this.data.lastname,
      email: this.data.email,
      role: this.role,
      notifySettings: this.notifySettings,
      phone: this.data.phone
    }))
  }

  logOut(){
    localStorage.removeItem("accessToken")
    localStorage.removeItem("AccountData");
    this.data = null;
  }
    
}

interface User{
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
}

export interface PsychInfo{
  id : number;
  allCountSession : number;
  year : number | null;
  intramuralMeet : boolean;
  onlineMeet : boolean;
  city : string | null;
  address : string | null;
  personalPrice : number;
  personalSalary : number;
  familyPrice : number;
  familySalary : number;
  childrenPrice : number;
  childrenSalary : number;
  languages : string[];
  specializations : Specialization[];
  personalTherapy : boolean;
  familyTherapy : boolean;
  childrenTherapy : boolean;
  typesOfTherapy : TypeOfTherapy[];
  educations : Education[]
}

interface NotifySetting{
  name: string;
  mail: boolean;
  telegram: boolean;
  site: boolean;
}