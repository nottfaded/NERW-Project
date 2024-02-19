import { Component, Input, OnInit } from '@angular/core';
import { CabinetService, SessionData } from '../../../../../injectable-services/cabinet.service';

@Component({
    selector: 'session-info',
    template: `
        <div class="block" 
            [class]="{
                'orange-shadow' : session.data.status === 'NotPayed' || timeToSession !== null,
                'red-shadow': session.data.status === 'Declined'
            }"
            (mouseleave)="isHideSetting = false"
        >
            <div class="left">
                <div class="date">
                    <div>{{session.data.date.getDate()}} {{monthUkr[session.data.date.getMonth()]}} {{session.data.date.getFullYear()}}</div>
                    <div>◦</div>
                    <div>Сьогодні</div>
                </div>
                <div class="text-with-img-container">
                    <div class="text-with-img">
                        <img src="assets/img/cabinet/sessions/user.svg" alt="user" id="user">
                        <div><a href="">{{session.data.user['name']}} {{session.data.user['surname']}}</a></div>
                    </div>
                    <div class="text-with-img">
                        <img src="assets/img/cabinet/sessions/location.svg" alt="location" id="location">
                        <div>{{session.data.city === null ? "Не вказано" : session.data.city + " " + session.data.street}}</div>
                    </div>
                </div>
            </div>

            <div class="right">
                <div class="block-time">
                    <div class="status-payed">
                        @if(session.data.status !== 'Declined' && timeToSession != ""){
                            <div class="text-with-time">
                                <p>Очікується {{session.data.status === 'NotPayed' ? 'оплата' : ''}}</p>
                                <p>{{session.timeToSession}}</p>
                            </div>
                        }
                        @else {
                            <div class="text-without-time">
                                @switch (session.data.status) {
                                    @case ('Completed'){
                                        <span>Завершено</span>
                                    }
                                    @case ('Declined') {
                                        <span>Відмінено</span>
                                    }
                                    @default {
                                        <span>Error</span>
                                    }
                                }
                            </div>
                        }
                    </div>
                    <div class="rating-and-time">
                        @if(session.data.status !== 'Completed'){
                            <div class="time">
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.4925 0C3.3525 0 0 3.36 0 7.5C0 11.64 3.3525 15 7.4925 15C11.64 15 15 11.64 15 7.5C15 3.36 11.64 0 7.4925 0ZM7.5 13.5C4.185 13.5 1.5 10.815 1.5 7.5C1.5 4.185 4.185 1.5 7.5 1.5C10.815 1.5 13.5 4.185 13.5 7.5C13.5 10.815 10.815 13.5 7.5 13.5ZM7.335 3.75H7.29C6.99 3.75 6.75 3.99 6.75 4.29V7.83C6.75 8.0925 6.885 8.34 7.1175 8.475L10.23 10.3425C10.485 10.4925 10.815 10.4175 10.965 10.1625C11.1225 9.9075 11.04 9.57 10.7775 9.42L7.875 7.695V4.29C7.875 3.99 7.635 3.75 7.335 3.75Z" fill="#444444"/>
                                    </svg>
                                </div>
                                <div>{{getTimeInfo(session)}}</div>
                            </div>
                        } @else {
                            <div class="rating" (mouseleave)="resetRating()">
                                @for (star of ratingStars; track $index) {
                                    <div (mouseover)="setHoverRating($index)">
                                        @if(star){
                                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="22" viewBox="0 0 25 22" fill="none"><path d="M12.5 0L16.3622 7.24194L25 8.40319L18.75 14.0402L20.225 22L12.5 18.242L4.77451 22L6.25001 14.0402L0 8.40319L8.63724 7.24194L12.5 0Z" fill="#F2B56E"/></svg>
                                        } @else {
                                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="22" viewBox="0 0 25 22" fill="none"><path d="M12.4999 1.06247L15.9211 7.47723L16.0416 7.70334L16.2956 7.73749L23.8635 8.7549L18.4151 13.6689L18.2074 13.8563L18.2584 14.1313L19.5528 21.117L12.7187 17.7924L12.5 17.6859L12.2813 17.7923L5.44671 21.117L6.74164 14.1314L6.79263 13.8563L6.58489 13.6689L1.13649 8.7549L8.70386 7.73748L8.95782 7.70334L9.07841 7.47725L12.4999 1.06247Z" fill="white" stroke="#F8A84C"/></svg>
                                        }
                                    </div>
                                } 
                            </div>
                        }
                    </div>
                    <div class="btn-detail">
                        <div><button>Детально</button></div>
                    </div>
                </div>
                <div class="block-change" (click)="isHideSetting = !isHideSetting">
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="6" viewBox="0 0 26 6" fill="none">
                        <circle cx="3" cy="3" r="3" fill="#949494"/>
                        <circle cx="13" cy="3" r="3" fill="#949494"/>
                        <circle cx="23" cy="3" r="3" fill="#949494"/>
                    </svg>
                </div>
                <div class="setting-block" [style]="{'display': isHideSetting ? 'flex' : 'none'}" (mouseleave)="isHideSetting = false">
                    <div class="setting-block-item">
                        <div class="icon-side">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                              <path d="M14.2222 1.78947H12.4444V0.894737C12.4444 0.657438 12.3508 0.429857 12.1841 0.262062C12.0174 0.094266 11.7913 0 11.5556 0C11.3198 0 11.0937 0.094266 10.927 0.262062C10.7603 0.429857 10.6667 0.657438 10.6667 0.894737V1.78947H5.33333V0.894737C5.33333 0.657438 5.23968 0.429857 5.07298 0.262062C4.90629 0.094266 4.68019 0 4.44444 0C4.2087 0 3.9826 0.094266 3.8159 0.262062C3.64921 0.429857 3.55556 0.657438 3.55556 0.894737V1.78947H1.77778C0.8 1.78947 0 2.59474 0 3.57895V5.4042H16V3.57895C16 2.59474 15.2 1.78947 14.2222 1.78947ZM14.2222 6.74631H0V15.2105C0 16.1947 0.8 17 1.77778 17H14.2222C15.2 17 16 16.1947 16 15.2105V6.74631H14.2222ZM11.5467 9.42158H11.5556C12.0444 9.42158 12.4444 9.81526 12.4444 10.3163C12.4444 10.8084 12.0444 11.2111 11.5556 11.2111C11.0667 11.2111 10.6667 10.8084 10.6667 10.3163C10.6667 9.81526 11.0578 9.42158 11.5467 9.42158ZM8 9.42158C8.49778 9.42158 8.88889 9.81526 8.88889 10.3163C8.88889 10.8084 8.49778 11.2111 8 11.2111C7.51111 11.2111 7.11111 10.8084 7.11111 10.3163C7.11111 9.81526 7.50222 9.42158 8 9.42158ZM8 12.5532C8.49778 12.5532 8.88889 12.9558 8.88889 13.4479C8.88889 13.94 8.49778 14.3426 8 14.3426C7.51111 14.3426 7.11111 13.94 7.11111 13.4479C7.11111 12.9558 7.50222 12.5532 8 12.5532ZM4.44444 9.42158C4.93333 9.42158 5.33333 9.81526 5.33333 10.3163C5.33333 10.8084 4.94222 11.2111 4.45333 11.2111H4.44444C3.95556 11.2111 3.55556 10.8084 3.55556 10.3163C3.55556 9.81526 3.95556 9.42158 4.44444 9.42158ZM4.44444 12.5532C4.93333 12.5532 5.33333 12.9558 5.33333 13.4479C5.33333 13.94 4.94222 14.3426 4.45333 14.3426H4.44444C3.95556 14.3426 3.55556 13.94 3.55556 13.4479C3.55556 12.9558 3.95556 12.5532 4.44444 12.5532Z" fill="#949494"/>
                            </svg>
                        </div>
                        <div class="text-side">
                            Перенести сеанс
                        </div>
                    </div>
                    <div class="setting-block-item">
                        <div class="icon-side">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="14" viewBox="0 0 18 14" fill="none">
                              <path d="M4.1076 9.63654C2.68887 8.97906 1.79999 8.03945 1.79999 6.99582C1.79999 5.31937 4.0963 3.91439 7.19995 3.51451V1.70437C3.09197 2.20493 0 4.38374 0 6.99582C0 8.502 1.03001 9.85985 2.68707 10.838C4.50003 11.9462 5.39996 10.1463 4.1076 9.63654ZM14.916 2.93304C13.9502 2.04621 12.6 3.39624 13.5208 4.19433C15.1547 4.85438 16.2001 5.86424 16.2001 6.99582C16.2001 8.67318 13.9034 10.0783 10.8001 10.478V12.2874C14.908 11.7876 18 9.60893 18 6.99582C18 5.37382 16.8034 3.92184 14.916 2.93304ZM7.99522 4.73663L10.9249 2.98236C11.3511 2.72707 11.352 2.31126 10.9272 2.05418L7.97044 0.264718C7.54513 0.00801736 7.20187 0.201923 7.20393 0.698888L7.21985 4.29886C7.22114 4.79595 7.5685 4.99192 7.99522 4.73663ZM10.0297 9.26478L7.07307 11.0541C6.64789 11.3112 6.64879 11.727 7.07551 11.9824L10.0048 13.7367C10.431 13.9915 10.7791 13.796 10.7813 13.2985L10.7967 9.69857C10.7983 9.20186 10.4546 9.00821 10.0297 9.26478Z" fill="#949494"/>
                            </svg>
                        </div>
                        <div class="text-side">
                            Змінити терапевта
                        </div>
                    </div>
                    <div class="setting-block-item">
                        <div class="icon-side">
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="14" viewBox="0 0 15 14" fill="none">
                              <path d="M14 13L1 1" stroke="#949494" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                              <path d="M14 1L1 13" stroke="#949494" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                        <div class="text-side">
                            Відмінити сеанс     
                        </div>
                    </div>
                </div>

            </div>
        </div>
    `,
    styleUrl: 'session-info.scss'
})

export class SessionInfo implements OnInit {
    constructor(protected cabService: CabinetService) { }
    
    ngOnInit(): void {
        this.session.setTimeToSession();
        
        let count = this.session.data.rating;
        for (let index in this.ratingStars) {
            if(count != 0){
                this.ratingStars[index] = true;
                count--;
            } else break;
        }
    }

    timeToSession: string | null = null;
    ratingStars: boolean[] = [false, false, false, false, false];
    isHideSetting = false;

    monthUkr: string[] = ["Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень", "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень"]
    @Input({required: true}) session: SessionData = new SessionData({
        city: 'Error',
        clientPhone: "",
        countMinutes: 50,
        date: new Date(),
        id: 1,
        status: "Error",
        rating: 0,
        street: "Error",
        user: {
            name: 'Error',
            surname: 'Error'
        }
    });

    getTimeInfo(session: SessionData) {
        return `${session.data.date.getHours()}:${session.data.date.getMinutes().toString().padStart(2, '0')}, ${session.data.countMinutes}хв`;
    }

    setHoverRating(index: any){
        if(this.session.data.rating !== 0) return;

        for (const key in this.ratingStars) {
            if(key <= index){
                this.ratingStars[key] = true;
            } else {
                this.ratingStars[key] = false;
            }
        }
    }
    resetRating(){
        if(this.session.data.rating !== 0) return;
        this.ratingStars = [false, false, false, false, false];
    }
    
}


