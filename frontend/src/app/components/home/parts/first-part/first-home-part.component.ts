import { Component } from "@angular/core";

@Component({
    selector: "frt-home-part",
    template: `
    <div class="frt-home-part-container">
        <div class="frt-home-part-container-left">
            <div class="frt-home-part-container-left-text">
                <div class="frt-home-part-container-left-text-title">
                    Ти не один
                </div>
                <div class="frt-home-part-container-left-text-body">
                    <p>Мільйони людей по всьому світу відчувають емоційні проблеми, такі як депресія, тривога, стрес або залежність.</p>
                    <p>Індивідуальна онлайн-терапія доступна в будь-який час і з будь-якої точки світу.</p>
                </div>
            </div>
            <div class="frt-home-part-container-left-btns">
                <button>Підібрати фахівця</button>
                <p>або</p>
                <button>Всі спеціалісти</button>
            </div>
        </div>
        <div class="frt-home-part-container-right">
            <img src="/assets/img/home-page/first-page-main-img.png" alt="main-image">
        </div>
    </div>
    <div class="frt-home-part-info">
        <div class="frt-home-part-info-item">
            <div class="frt-home-part-info-item-title">
                96%
            </div>
            <div class="frt-home-part-info-item-body">
                клієнтів відчули полегшення вже після трьох сессій
            </div>
        </div>
        <div class="frt-home-part-info-item">
            <div class="frt-home-part-info-item-title">
                4 000+
            </div>
            <div class="frt-home-part-info-item-body">
                проведенних сессій
            </div>
        </div>
        <div class="frt-home-part-info-item">
            <div class="frt-home-part-info-item-title">
                50 хв
            </div>
            <div class="frt-home-part-info-item-body">
                середня тривалість сесії
            </div>
        </div>
        <div class="frt-home-part-info-item">
            <div class="frt-home-part-info-item-title">
                500+
            </div>
            <div class="frt-home-part-info-item-body">
                позитивних відгуків від клієнтів
            </div>
        </div>
    </div>
    `,
    styleUrls:['./first-home-part.scss', '../../home.scss'],
})

export class FirstHomePageComponent { 
    constructor() { }

}