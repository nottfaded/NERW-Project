import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AccountData{
  data: User | null = null;
  // user: User | null = null;

  constructor(){
    this.getData();
  }

  getData(){
    const accData = localStorage.getItem("accountData");
    if(accData){
      const data = JSON.parse(accData);
      this.data = new User(data.name, data.surname, data.email, new Date(data.dateOfBirth));
    }
  }

  logOut(){
    localStorage.removeItem("accessToken")
    localStorage.removeItem("accountData");
    this.data = null;
  }
    
}

class User{
  firstName: string = "";
  lastName: string = "";
  email: string = "";
  birthday: Date | null = null; 

  constructor(fname : any, lname : any, email: any, birthday: Date){
    this.firstName = fname;
    this.lastName = lname;
    this.email = email;
    this.birthday = birthday;
  }
}
