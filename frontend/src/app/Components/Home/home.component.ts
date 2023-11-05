import { Component } from "@angular/core";

@Component({
    selector: "home-page",
    template: `
    <header [activePage]="'home'"></header>
    <frt-home-part></frt-home-part>
    <div class="home-page-special-text"><span>Ми можемо тобі допомогти</span></div>
    <scnd-home-part></scnd-home-part>
    <div class="home-page-special-text"><span>Чому ми?</span></div>
    <thrd-home-part></thrd-home-part>
    <div class="home-page-special-text"><span>Екстрені служби</span></div>
    <div class="emergency-services-container">
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
    </div>
    <footer></footer>
    `,
    styleUrls: ['./home.scss'],
})

export class HomeComponent {
    constructor() { }

}