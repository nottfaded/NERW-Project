import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
    selector: 'scnd-home-part',
    template: `
        <div class="scnd-home-part">
            <div class="scnd-home-part-images">
                <div class="scnd-home-part-images-item" (click)="scrollToElement()">
                    <img src="/assets/img/home-page/freedom-from-fear.png" alt="freedom-from-fear">
                    <div class="scnd-home-part-images-item-text">
                        <div class="scnd-home-part-images-item-text-body">
                            Ми допоможемо тобі подолати страхи, які заважають тобі насолоджуватися та жити повноцінним життям. 
                        </div>
                        <div class="scnd-home-part-images-item-text-title">
                            Свобода від страху
                        </div>
                    </div>
                </div>
                <div class="scnd-home-part-images-item" (click)="scrollToElement()">
                    <img src="/assets/img/home-page/family-therapy.png" alt="family-therapy">
                    <div class="scnd-home-part-images-item-text">
                        <div class="scnd-home-part-images-item-text-body" [ngStyle]="{'width':'100%'}">
                            Зробіть свою родину щасливішою. Наші експерти допоможуть вам зміцнити відносини.
                        </div>
                        <div class="scnd-home-part-images-item-text-title">
                            Сімейна терапія
                        </div>
                    </div>
                </div>
                <div class="scnd-home-part-images-item" (click)="scrollToElement()">
                    <img src="/assets/img/home-page/help-24-7.png" alt="help-24-7">
                    <div class="scnd-home-part-images-item-text">
                        <div class="scnd-home-part-images-item-text-body">
                            Ти не сам в цьому. Наші психологи готові тебе слухати та надавати підтримку у будь-який час, коли тобі це потрібно. 
                        </div>
                        <div class="scnd-home-part-images-item-text-title">
                            Підтримка 24/7 
                        </div>
                    </div>
                </div>
                <div class="scnd-home-part-images-item" (click)="scrollToElement()">
                    <img src="/assets/img/home-page/specialized-help.png" alt="specialized-help">
                    <div class="scnd-home-part-images-item-text">
                        <div class="scnd-home-part-images-item-text-body">
                            Наші курси та тренінги спрямовані на підвищення твоєї впевненості, заспокоєння у стресових ситуаціях та розвиток корисних навичок.
                        </div>
                        <div class="scnd-home-part-images-item-text-title">
                            Розвиток особистості
                        </div>
                    </div>
                </div>
                <div class="scnd-home-part-images-item" (click)="scrollToElement()">
                    <img src="/assets/img/home-page/online-consultation.png" alt="online-consultation">
                    <div class="scnd-home-part-images-item-text">
                        <div class="scnd-home-part-images-item-text-body" [ngStyle]="{'width':'100%'}">
                            Ми розуміємо, що твоє емоційне самопочуття - це пріоритет, і ми готові працювати з тобою в будь-який зручний для тебе спосіб. 
                        </div>
                        <div class="scnd-home-part-images-item-text-title">
                            Онлайн консультація
                        </div>
                    </div>
                </div>
                <div class="scnd-home-part-images-item" (click)="scrollToElement()">
                    <img src="/assets/img/home-page/personality-development.png" alt="personality-development">
                    <div class="scnd-home-part-images-item-text">
                        <div class="scnd-home-part-images-item-text-body">
                            Ми завжди поряд щоб допомогти у твоїх проблемах. Ми знаємо як тобі допомогти.
                        </div>
                        <div class="scnd-home-part-images-item-text-title">
                            Спеціалізована Допомога
                        </div>
                    </div>
                </div>
            </div>

            <div class="myTargetElement"></div>
            <div class="step-by-step-part-title">
                <div class="step-by-step-part-title-text"> <span>Крок за кроком </span> </div>
            </div>
            
            <div class="step-by-step-part">
                <div class="step-by-step-part-container">
                    <div class="step-by-step-part-container-left">
                        <img src="/assets/img/home-page/step-by-step.png" alt="step-by-step">
                    </div>
                    <div class="step-by-step-part-container-right">
                        <ol>
                            <li>
                                <span class="step-by-step-part-container-right-list-title">
                                    Почни з тесту
                                </span>
                                <p class="step-by-step-part-container-right-list-body">
                                    Розкажи нам про свої потреби, і ми підберемо тобі терапевта, який має досвід роботи з такими питаннями.
                                </p>
                            </li>
                            <li>
                                <span class="step-by-step-part-container-right-list-title">
                                    Обери психотерапевта
                                </span>
                                <p class="step-by-step-part-container-right-list-body">
                                    Дізнайся про освіту, кваліфікацію та підхід терапевта, щоб краще зрозуміти його стиль роботи.
                                </p>
                            </li>
                            <li>
                                <span class="step-by-step-part-container-right-list-title">
                                    Визначи зручний час та дату
                                </span>
                                <p class="step-by-step-part-container-right-list-body">
                                    Зв’яжись з терапевтом у месенджері або телефонуй, щоб обговорити деталі та узгодити час першої зустрічі.
                                </p>
                            </li>
                            <li>
                                <span class="step-by-step-part-container-right-list-title">
                                    Оплати сесію
                                </span>
                                <p class="step-by-step-part-container-right-list-body">
                                    Карткою банку будь-якої країни або <b>Apple/Google Pay</b>.
                                </p>
                            </li>
                        </ol>
                    </div>
                </div>
                <div class="step-by-step-part-btn">
                    <button>Пройти тест</button>
                </div>
            </div>
        </div>
    `,
    styleUrls: ["./second-home-part.scss"]
})
export class SecondHomePartComponent {
    
    constructor() { }

    scrollToElement() {
        document.querySelector('.myTargetElement')?.scrollIntoView({ behavior: 'smooth' })
    }
}