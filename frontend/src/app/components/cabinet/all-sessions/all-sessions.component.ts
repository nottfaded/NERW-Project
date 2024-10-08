import { Component, OnDestroy, OnInit } from '@angular/core';
import { CabinetService, SessionData } from '../../../injectable-services/cabinet.service';
import { AccountService, Role } from '../../../injectable-services/account.service';
import { Router } from '@angular/router';

interface LastClient{
    fullName: string;
    phone: string;
    lastSession: Date
}

@Component({
    selector: 'all-sessions',
    template: `
        <div class="global-container">

            <div class="left">
                <div class="block-sorts">
                    <select class="custom-select" (change)="onSelectChange($event)">
                        @for (item of selectSort; track $index) {
                            <option [value]="$index" [selected]="$index === activeSelectSort">{{item}}</option>
                        }
                    </select>
                </div>

                <div class="sessions-info-container" [class.many-session]="cabService.allSessions.length > 4">
                @for (session of filterSession; track $index) {
                    <session-info [session]="session"/>
                }    
                </div>

                <div class="btn-more-container" (click)="takeMoreSession()">
                    <button>Показати ще...</button>
                </div>
            </div>

            <div class="right">
                @if(account.role == 1){
                    <div class="title">Останні терапевти</div>
                    <div class="block-psych">
                        <div class="top">
                            <div class="img-block">
                                <div class="inside-block">

                                </div>
                                <img src="assets/img/cabinet/test-icon.png" alt="test-icon">
                            </div>
                            <div>
                                <div class="user-info-container">
                                    <div class="name-info">
                                        <div class="full-name">Андрій Морозенко</div>
                                        <div class="roles">Психолог, Психотерпевт</div>
                                    </div>

                                    <div class="other-info">
                                        <div class="info-psycho" id="experience">
                                            <!-- <div> -->
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="18" viewBox="0 0 16 18" fill="none">
                                                  <path d="M5.97755 0.000130431C5.84814 -0.00169953 5.70536 0.015433 5.53036 0.0701273C5.18037 0.179125 5.02425 0.343024 4.84796 0.503492C4.67167 0.663777 4.50977 0.837026 4.35279 1.00983C4.03885 1.35558 3.65971 1.73353 3.70444 1.70232C3.7492 1.67136 3.26271 1.89914 2.82398 2.0791C2.60462 2.16893 2.37636 2.26725 2.16325 2.37843C1.95011 2.48997 1.74536 2.57895 1.52882 2.86541C1.31228 3.15175 1.28418 3.37006 1.23945 3.5996C1.19477 3.82913 1.17275 4.06345 1.15125 4.29209C1.10823 4.74937 1.02736 5.26151 1.04449 5.21094C1.06161 5.16034 0.805296 5.62281 0.560154 6.01662C0.437582 6.21359 0.313277 6.42385 0.208897 6.63464C0.104517 6.84544 0.000375226 7.03247 9.29299e-07 7.3867C-0.000363486 7.74094 0.106511 7.92924 0.210442 8.14025C0.31438 8.35134 0.439542 8.55368 0.561699 8.75084C0.806016 9.14511 1.05996 9.60861 1.04294 9.558C1.0259 9.50749 1.10141 10.0284 1.14352 10.4858C1.1646 10.7143 1.18749 10.9487 1.23172 11.1783C1.27593 11.4081 1.30049 11.6272 1.51644 11.914C1.73238 12.2008 1.93953 12.2905 2.15242 12.4024C2.36531 12.5142 2.59242 12.6071 2.8116 12.6973C3.24994 12.878 3.73982 13.1129 3.69515 13.0815C3.65047 13.0506 4.0241 13.4204 4.33732 13.7666C4.49393 13.9397 4.65498 14.1167 4.83094 14.2774C5.00689 14.4382 5.16356 14.5996 5.51333 14.7092C5.86309 14.8192 6.08365 14.7777 6.32416 14.748C6.56469 14.7179 6.80503 14.6725 7.0375 14.6214C7.50245 14.5195 8.03821 14.4248 7.98296 14.4248C7.92774 14.4247 8.46059 14.5155 8.92531 14.6184C9.15768 14.6698 9.39509 14.7221 9.63557 14.7524C9.87598 14.7838 10.098 14.8227 10.4479 14.7137C10.7979 14.6047 10.9541 14.4466 11.1303 14.2863C11.3066 14.126 11.4763 13.9466 11.6332 13.774C11.9472 13.4283 12.3186 13.0577 12.2739 13.089C12.2291 13.1199 12.7218 12.8921 13.1605 12.7122C13.3799 12.6224 13.6019 12.5225 13.8151 12.4114C14.0282 12.2998 14.2329 12.2123 14.4495 11.9259C14.666 11.6395 14.6941 11.4212 14.7388 11.1917C14.7835 10.9621 14.8056 10.7278 14.827 10.4992C14.8701 10.0419 14.9509 9.52233 14.9338 9.57289C14.9167 9.62349 15.173 9.16106 15.4181 8.76722C15.5407 8.57024 15.665 8.36743 15.7694 8.15663C15.8738 7.94584 15.9779 7.75884 15.9783 7.40457C15.9787 7.05034 15.8718 6.86204 15.7678 6.65103C15.6639 6.43994 15.5403 6.23015 15.4181 6.033C15.1738 5.63869 14.9183 5.18118 14.9354 5.23179C14.9524 5.2823 14.8769 4.76136 14.8348 4.304C14.8138 4.07512 14.7908 3.84113 14.7466 3.61151C14.7024 3.38171 14.6778 3.16263 14.4619 2.87583C14.2459 2.589 14.0388 2.50084 13.8259 2.38885C13.613 2.27709 13.3859 2.1771 13.1667 2.08654C12.7284 1.90579 12.2385 1.67864 12.2831 1.70977C12.3278 1.74064 11.9557 1.3621 11.6425 1.01579C11.4859 0.84261 11.3233 0.667212 11.1474 0.506469C10.9714 0.345617 10.8147 0.184281 10.465 0.0745932C10.1152 -0.0353495 9.89467 0.0117644 9.65414 0.0418291C9.41361 0.0718938 9.17327 0.118783 8.94079 0.169903C8.47585 0.271779 7.9401 0.3661 7.99534 0.366481C8.05056 0.366535 7.5177 0.268316 7.05298 0.165436C6.82062 0.113998 6.5832 0.0676659 6.34273 0.0373617C6.22252 0.021662 6.10696 0.00196731 5.97755 0.000130431ZM8.017 4.01062C8.13927 4.01157 8.25963 4.0399 8.36864 4.09339C8.47765 4.14688 8.57233 4.22407 8.64524 4.31889L9.56284 5.51474L11.1102 6.07767C11.2238 6.11909 11.326 6.18523 11.4088 6.27096C11.4917 6.35669 11.553 6.45971 11.588 6.57203C11.623 6.68436 11.6308 6.80297 11.6107 6.91868C11.5907 7.03439 11.5433 7.14409 11.4723 7.23927L10.5779 8.45448L10.5021 10.0509C10.4964 10.1675 10.4632 10.2813 10.4049 10.3835C10.3467 10.4858 10.265 10.5738 10.1661 10.6408C10.0672 10.7078 9.95371 10.752 9.83439 10.77C9.71507 10.7881 9.59307 10.7795 9.47773 10.7449L8.00153 10.2967L6.40772 10.7166C6.29033 10.7487 6.16685 10.7541 6.04694 10.7324C5.92704 10.7107 5.81396 10.6625 5.71656 10.5916C5.61915 10.5206 5.54007 10.4288 5.48548 10.3234C5.4309 10.218 5.4023 10.1018 5.40192 9.98392L5.38956 8.49022L4.48589 7.15587C4.41915 7.05838 4.37645 6.94738 4.36108 6.83142C4.34571 6.71546 4.35808 6.59763 4.39724 6.48701C4.4364 6.37639 4.50131 6.27591 4.58697 6.19333C4.67262 6.11074 4.77674 6.04825 4.89131 6.01066L6.36442 5.54155L7.39962 4.29506C7.46767 4.2134 7.55238 4.14613 7.64848 4.09745C7.74458 4.04878 7.85001 4.01973 7.95822 4.01211C7.97779 4.0109 7.99739 4.01043 8.017 4.01062Z" fill="#66BC8F"/>
                                                  <path d="M2.66406 12.8574V15.4678C2.66406 16.1684 2.91086 16.8121 3.33149 17.3203C3.54178 17.5744 3.80333 17.8013 4.1461 17.9235C4.48886 18.0457 4.92588 18.0267 5.28772 17.8325L7.99017 16.3853L10.6926 17.8325C10.7989 17.8889 10.916 17.9179 11.0345 17.9171C12.2863 17.9171 13.3163 16.8114 13.3163 15.4678V12.8686C13.0104 13.0167 12.626 13.2053 12.6592 13.1797C12.708 13.1418 12.3028 13.5923 11.9606 14.0126C11.7895 14.2225 11.6042 14.4401 11.4121 14.6349C11.2199 14.8298 11.0503 15.0226 10.6688 15.1551C10.2873 15.2876 10.0449 15.2397 9.78288 15.2014C9.52077 15.1643 9.26332 15.1013 9.0099 15.0386C8.50336 14.9136 7.92261 14.804 7.98273 14.8041C8.04293 14.8041 7.45786 14.918 6.9511 15.0418C6.69771 15.1039 6.43572 15.1601 6.17367 15.1966C5.91153 15.2327 5.67189 15.2824 5.29069 15.1487C4.90943 15.0154 4.73783 14.8192 4.54596 14.6238C4.35416 14.4284 4.17843 14.2136 4.00786 14.0031C3.66646 13.5822 3.26058 13.1325 3.3092 13.1702C3.34185 13.1957 2.96241 13.0053 2.66406 12.8574Z" fill="#66BC8F"/>
                                                </svg>
                                            <!-- </div> -->
                                            <!-- <div> -->
                                                3 роки досвіду
                                            <!-- </div> -->
                                        </div>
                                        <div class="info-psycho" id="average-rating">
                                            <!-- <div> -->
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="12" viewBox="0 0 14 12" fill="none">
                                                  <path d="M8.90909 6.66667V10.6667C8.90909 11.0203 8.775 11.3594 8.53632 11.6095C8.29764 11.8595 7.97391 12 7.63636 12H6.36364C6.02609 12 5.70236 11.8595 5.46368 11.6095C5.225 11.3594 5.09091 11.0203 5.09091 10.6667V6.66667C5.09091 6.31305 5.225 5.97391 5.46368 5.72386C5.70236 5.47381 6.02609 5.33333 6.36364 5.33333H7.63636C7.97391 5.33333 8.29764 5.47381 8.53632 5.72386C8.775 5.97391 8.90909 6.31305 8.90909 6.66667ZM2.54545 2H1.27273C0.935179 2 0.611456 2.14048 0.372773 2.39052C0.134091 2.64057 0 2.97971 0 3.33333V10.6667C0 11.0203 0.134091 11.3594 0.372773 11.6095C0.611456 11.8595 0.935179 12 1.27273 12H2.54545C2.883 12 3.20673 11.8595 3.44541 11.6095C3.68409 11.3594 3.81818 11.0203 3.81818 10.6667V3.33333C3.81818 2.97971 3.68409 2.64057 3.44541 2.39052C3.20673 2.14048 2.883 2 2.54545 2ZM12.7273 0H11.4545C11.117 0 10.7933 0.140476 10.5546 0.390524C10.3159 0.640573 10.1818 0.979711 10.1818 1.33333V10.6667C10.1818 11.0203 10.3159 11.3594 10.5546 11.6095C10.7933 11.8595 11.117 12 11.4545 12H12.7273C13.0648 12 13.3885 11.8595 13.6272 11.6095C13.8659 11.3594 14 11.0203 14 10.6667V1.33333C14 0.979711 13.8659 0.640573 13.6272 0.390524C13.3885 0.140476 13.0648 0 12.7273 0Z" fill="#66BC8F"/>
                                                </svg>
                                            <!-- </div> -->
                                            <!-- <div> -->
                                                4.7  Cередня оцінка
                                            <!-- </div> -->
                                        </div>
                                        <div class="info-psycho" id="year-old">
                                            <!-- <div> -->
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="16" viewBox="0 0 14 16" fill="none">
                                                  <path d="M0 13.656V12.5063C0.0212184 12.0874 0.155973 11.6824 0.38969 11.3349C0.623414 10.9874 0.947211 10.7108 1.32608 10.5349C4.96732 9.0651 9.0327 9.0651 12.6739 10.5349C13.0528 10.7108 13.3765 10.9874 13.6103 11.3349C13.8441 11.6824 13.9787 12.0874 14 12.5063V13.656C13.9999 13.9641 13.9393 14.2693 13.8217 14.5539C13.7042 14.8385 13.5319 15.097 13.3149 15.3147C13.0978 15.5325 12.8402 15.705 12.5568 15.8226C12.2733 15.9401 11.9695 16.0005 11.6629 16H2.33712C2.03047 16.0005 1.72673 15.9401 1.44326 15.8226C1.1598 15.705 0.902186 15.5325 0.685135 15.3147C0.468083 15.097 0.295853 14.8385 0.178291 14.5539C0.0607357 14.2693 0.000148985 13.9641 0 13.656ZM7 1.67162e-07C6.23068 -0.000225883 5.47857 0.228816 4.83879 0.658158C4.19901 1.0875 3.70031 1.69785 3.40574 2.41203C3.11118 3.12622 3.034 3.91212 3.18394 4.6704C3.33389 5.42866 3.70424 6.12521 4.24815 6.67194C4.79207 7.21868 5.48511 7.59105 6.23963 7.74195C6.99416 7.89286 7.77628 7.81553 8.48706 7.51972C9.19784 7.22393 9.80537 6.72296 10.2328 6.08017C10.6602 5.43739 10.8884 4.68167 10.8884 3.90857C10.8885 3.39535 10.7881 2.88712 10.5927 2.41291C10.3974 1.93871 10.111 1.50782 9.7499 1.14487C9.38882 0.781904 8.96011 0.493983 8.48829 0.297545C8.01645 0.101107 7.51072 1.4521e-07 7 1.67162e-07Z" fill="#66BC8F"/>
                                                </svg>
                                            <!-- </div> -->
                                            <!-- <div> -->
                                                26 років
                                            <!-- </div> -->
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="bottom">
                            <div class="left">
                                Тільки онлайн
                            </div>
                            <button>Відкрити профіль</button>
                        </div>
                    </div>
                } @else if(account.role === 3) {
                    <div class="title">Останні клієнти</div>
                    @for (item of arrayLastClients; track $index) {
                        <div class="block-client">
                            <div class="client-info">
                                <div class="row">
                                    <div class="column">
                                        <span>{{item.fullName}}</span>
                                        <div class="phone">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="1.632208922742111vh" height="1.632208922742111vh" viewBox="0 0 15 15" fill="none">
                                              <path d="M14.5576 13.3864C14.5576 13.3864 11.1413 18.2612 3.94859 11.0647C-3.28589 3.81687 1.6339 0.44737 1.6339 0.44737C1.78799 0.29272 1.97357 0.173057 2.17805 0.0965193C2.38252 0.0199811 2.60108 -0.0116375 2.81886 0.00381353C3.03665 0.0192645 3.24855 0.0814229 3.44017 0.186062C3.63178 0.2907 3.79861 0.435366 3.92931 0.61022L5.31383 2.46478C5.53388 2.75843 5.6407 3.12153 5.61472 3.48754C5.58875 3.85353 5.4317 4.19792 5.17238 4.45755L3.95288 5.67893C3.95288 5.67893 3.95288 6.75674 6.10683 8.91343C8.26078 11.0701 9.33776 11.0701 9.33776 11.0701L10.5573 9.84874C10.8164 9.58923 11.1605 9.43202 11.5263 9.40604C11.8922 9.38005 12.2551 9.48704 12.5483 9.70732L14.3936 11.0937C14.5674 11.2249 14.7109 11.3918 14.8149 11.5831C14.9188 11.7744 14.9807 11.9857 14.9961 12.2029C15.0116 12.42 14.9806 12.638 14.9049 12.8421C14.8293 13.0463 14.7108 13.2318 14.5576 13.3864Z" fill="#222222"/>
                                            </svg>
                                            {{item.phone}}
                                        </div>
                                    </div>
                                    <div class="date">18.08.2023<p>10:00</p></div>
                                </div>
                            </div>
                            <button class="task-btn">Додати завдання</button>
                            <button class="profile-btn">Профіль</button>
                        </div>
                    }
                }
            </div>

        </div>
    `,
    styleUrls: ['all-sessions.scss']
})

export class AllSessionsComponent implements OnInit, OnDestroy {
    constructor(protected cabService: CabinetService, protected account: AccountService, private router: Router) { }
    
    ngOnDestroy(): void {
        clearInterval(this.intervalForSessionsTime);
    }

    ngOnInit(): void {
        this.cabService.allSessions$.subscribe(toggle => {
            this.takeMoreSession();
            // this.intervalForSessionsTime = setInterval(() => {
            //     for (const session of this.filterSession.filter(i => i.data.status != 'Completed' && i.data.status != 'Declined')) {
            //         session.setTimeToSession();
            //     }
            // }, 1000);
        })

        if(this.account.role == Role.Psychologist){
            let arr = this.cabService.allSessions.slice(0, 4);
            for (const session of arr) {
                this.arrayLastClients.push({
                    fullName: session.data.user['name'] + " " + session.data.user['surname'],
                    phone: session.data.clientPhone,
                    lastSession: session.data.date
                })
            }
            
        }
    }

    intervalForSessionsTime: any = null;

    selectSort : string[] = ['Без сортування'/*, 'Сортування'*/];
    activeSelectSort : number = 1;

    filterSession: SessionData[] = [];
    countViewSession = 0;

    arrayLastClients: LastClient[] = []

    onSelectChange(event: Event){
        // const selectedValue = Number.parseInt((event.target as HTMLSelectElement).value);
        
    }

    takeMoreSession(){
        if(this.countViewSession + 4 >= this.cabService.allSessions.length){
            this.countViewSession = this.cabService.allSessions.length;
        } else {
            this.countViewSession += 4;
        }
        
        this.filterSession = this.cabService.allSessions.filter((_, i) => i < this.countViewSession)
    }
}