import { Component } from "@angular/core";

@Component({
    selector: "frt-home-part",
    template: `
    <div class="frt-home-part">
        <div class="frt-home-page-container">
            <div class="frt-home-page-container-left">
                <div class="frt-home-page-container-left-title">
                    Шукаєш щастя?
                </div>
                <div class="frt-home-page-container-left-body">
                    <p>Мільйони людей у всьому світі звертаються до терапії, <br> щоб покращити своє психологічне здоров'я та життя.</p>
                    <p>Пройди тест та знайди свого психотерапевта за кілька хвилин.</p>
                </div>
                <div class="frt-home-page-container-left-footer">
                    <button>Підібрати фахівця</button>
                    <button>Всі спеціалісти</button>
                </div>
            </div>
            <!-- <div class="frt-home-page-container-right"> -->
                <img src="/assets/img/home-page/first-page-main-img.png" alt="first-page-main-img">
            <!-- </div> -->
        </div>
    </div>
    `,
    styleUrls:['./first-home-part.scss', '../../home.scss'],
})

export class FirstHomePageComponent { 
    constructor() { }

}