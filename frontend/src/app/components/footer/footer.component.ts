import { Component } from '@angular/core';

@Component({
    selector: 'footer',
    template: `
    <div class="footer">
        <div class="company-name">Talkind</div>
        <div class="links-container">
            <!-- <div > -->
                <ul class="link-item">
                    <li><a href="">Доп. сторінки</a></li>
                    <li><a href="">Психологічні тести</a></li>
                    <li><a href="">Сертифікати 🎁</a></li>
                    <li><a href="">Співпраця</a></li>
                </ul>
            <!-- </div> -->
            <!-- <div > -->
                <ul class="link-item">
                    <li><a href="">Важливо знати</a></li>
                    <li><a href="">Питання та відповіді</a></li>
                    <li><a href="">Блог</a></li>
                </ul>
            <!-- </div> -->
            <!-- <div > -->
                <ul class="link-item">
                    <li><a href="">Юр. інформація</a></li>
                    <li><a href="">Політика конфіденційності</a></li>
                    <li><a href="">Правила користування сайтом</a></li>
                </ul>
            <!-- </div> -->
            <!-- <div > -->
                <ul class="link-item">
                    <li><a href="">Зв’язатись з нами</a></li>
                    <li><a href="">talkind.team&#64;gmail.com</a></li>
                    <li class="icons">
                        <a href="">
                            <img src="assets/img/social/icon-instagram.svg" alt="">
                        </a>
                        <a href="">
                            <img src="assets/img/social/icon-telegram.svg" alt="">
                        </a>
                        <a href="">
                            <img src="assets/img/social/icon-tiktok.svg" alt="">
                        </a>
                        <a href="">
                            <img src="assets/img/social/icon-facebook.svg" alt="">
                        </a>
                        <a href="">
                            <img src="assets/img/social/icon-youtube.svg" alt="">
                        </a>
                    </li>
                </ul>
            <!-- </div> -->
        </div>
    </div>
    <div class="sub-footer">
        <div>Copyright 2023 (с)</div>
        <div><span>Сайт розробив <a href="https://www.linkedin.com/in/oleksii-oleinykov-5a3117239/">Oleksii Oleynikov</a></span></div>
    </div>
    `,
    styleUrls: ['./footer.scss']
})

export class FooterComponent {
    constructor() { }

}