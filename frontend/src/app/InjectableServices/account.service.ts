import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AccountData{
  user: User | null = null;

  constructor(){
    this.getData();
  }

  getData(){
    const accData = localStorage.getItem("accountData");
    if(accData){
      const data = JSON.parse(accData);
      this.user = new User(data.name, data.surname, data.email, new Date(data.dateOfBirth));
    }
  }

  logOut(){
    localStorage.removeItem("accessToken")
    localStorage.removeItem("accountData");
    this.user = null;
  }
    
}

class User{
  firstname: string = "";
  lastname: string = "";
  email: string = "";
  birthday: Date | null = null; 

  constructor(fname : any, lname : any, email: any, birthday: Date){
    this.firstname = fname;
    this.lastname = lname;
    this.email = email;
    this.birthday = birthday;
  }
}
