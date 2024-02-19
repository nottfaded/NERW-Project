import { Injectable } from '@angular/core';
import { getCurrentDateTime } from '../main-app/app.component';
import { BehaviorSubject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class CabinetService {
    constructor() { }
    
    allSessions: SessionData[] = []
    private _allSessionWasTaken = new BehaviorSubject<boolean>(false);
    allSessions$ = this._allSessionWasTaken.asObservable();

    setAllSession(allSessions: ISession[]){
        for (const item of allSessions) {
            item.date = new Date(item.date)
            this.allSessions.push(new SessionData(item))
        }
        this._allSessionWasTaken.next(true);
    }

}

export class SessionData{
    data: ISession;
    timeToSession: string;

    constructor(session: ISession){
        this.data = session;
        this.timeToSession = "";
    }

    setTimeToSession() : void {
        let currentTime = getCurrentDateTime();

        if(currentTime > this.data.date){
            this.timeToSession = "";
        } else {
            let difference = this.data.date.getTime() - currentTime.getTime();

            let hours = Math.floor(difference / (1000 * 60 * 60)).toString();
            let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)).toString();
            let seconds = Math.floor((difference % (1000 * 60)) / 1000).toString();

            hours = String(hours).padStart(2, '0');
            minutes = String(minutes).padStart(2, '0');
            seconds = String(seconds).padStart(2, '0');
            
            this.timeToSession = `${hours}:${minutes}:${seconds}`
        }
    }
}
export interface ISession{
    id : number;
    clientPhone: string; 
    date: Date;
    countMinutes: number;
    city: string;
    street: string;
    status: string;
    rating: number;
    user: {[key: string]: string}
}
