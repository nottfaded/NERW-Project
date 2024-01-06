import { Component, ElementRef, HostListener } from "@angular/core";

@Component({
    selector: "home-page",
    template: `
    <header [activePage]="'home'"></header>
    <frt-home-part></frt-home-part>
    <div class="home-page-special-text">Ми можемо тобі допомогти</div>
    <scnd-home-part></scnd-home-part>

    <div class="button-up-container">
        <div class="button-up-btn" [ngClass]="{'fixed': isFixed}" (click)="scrollToTop()">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="17" viewBox="0 0 24 17" fill="none">
              <path d="M14.7748 3.41368C15.1546 3.80831 15.1534 4.44708 14.7721 4.84031L3.72569 16.2317C3.34435 16.6249 2.72728 16.6237 2.34741 16.229L0.284138 14.085C-0.0957334 13.6903 -0.0945641 13.0515 0.28677 12.6583L11.3333 1.26687C11.7145 0.873643 12.3316 0.874954 12.7114 1.26959L14.7748 3.41368Z" fill="white"/>
              <path d="M11.3333 1.26687C11.7145 0.873643 12.3316 0.874954 12.7114 1.26959L23.7159 12.7037C24.0957 13.0984 24.0946 13.7371 23.7133 14.1303L21.642 16.2662C21.2607 16.6594 20.6437 16.6582 20.2639 16.2635L9.25928 4.82861C8.87941 4.43397 8.88058 3.79521 9.26191 3.40198L11.3333 1.26687Z" fill="white"/>
            </svg>
        </div>
    </div>

    <div class="home-page-special-text">Чому ми?</div>
    <thrd-home-part></thrd-home-part>
    <fourth-home-part></fourth-home-part>
    <!-- <div class="home-page-special-text">Екстрені служби</div> -->
    <!-- <div class="emergency-services-container">
        <div class="emergency-services-item">
            <div class="emergency-services-text">Домашнє насильство та гендерна дискримінація</div>
            <div class="emergency-services-links">
                <a href="tef: 0800500225">0 800 500 335</a>
                <br>
                <a href="tef: 116123">116 123</a>
            </div>
        </div>
        <div class="emergency-services-item">
            <div class="emergency-services-text">Національна лінія підтримки для дітей</div>
            <div class="emergency-services-links">
                <a href="tef: 0800500225">0 800 500 225</a>
                <br>
                <a href="tef: 116111">116 111</a>
            </div>
        </div>
        <div class="emergency-services-item">
            <div class="emergency-services-text">Тяжкі розлади у дітей та дорослих</div>
            <div class="emergency-services-links">
                <a href="tef: 0675949446">(067) 594 94 46</a>
                <br>
                <a href="tef: 0959136941">0959136941</a>
            </div>
        </div>
        <div class="emergency-services-item">
            <div class="emergency-services-text">Національна лінія запобігання суїцидам 24/7</div>
            <div class="emergency-services-links">
                <a href="tef: 7333">7333</a>
            </div>
        </div>
    </div> -->
    <footer></footer>
    `,
    styleUrls: ['./home.scss'],
})

export class HomeComponent {
    isFixed = true;
    
    constructor(private el: ElementRef) { }

    @HostListener('window:scroll', [])
    onWindowScroll() {
        let  scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        let  containerOffset = this.el.nativeElement.querySelector('.button-up-container').getBoundingClientRect().top;

        this.isFixed = scrollPosition - containerOffset > 140;
    }

    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}