import { Component } from '@angular/core';

@Component({
    selector: 'thrd-home-part',
    template: `
        <div class="thrd-home-part">
            <div class="thrd-home-part-block-reasons">
                <div class="thrd-home-part-block-reason">
                    <img src="/assets/img/home-page/expertise.png" alt="expertise">
                    <div class="thrd-home-part-block-reason-text">
                        <div class="thrd-home-part-block-reason-text-title">
                            Експертність: 
                        </div>
                        <div class="thrd-home-part-block-reason-text-body">
                            Наша команда налічує висококваліфікованих психологів і терапевтів готових допомогти вам з будь-якими психологічними питаннями.
                        </div>
                    </div>
                </div>
                <div class="thrd-home-part-block-reason">
                    <img src="/assets/img/home-page/health-of-body-and-mind.png" alt="health-of-body-and-mind">
                    <div class="thrd-home-part-block-reason-text">
                        <div class="thrd-home-part-block-reason-text-title">
                            Здоров'я тіла та думки: 
                        </div>
                        <div class="thrd-home-part-block-reason-text-body">
                            Наші психологи та психотерапевти співпрацюють із лікарями, щоб забезпечити комплексний підхід до тебе.
                        </div>
                    </div>
                </div>
                <div class="thrd-home-part-block-reason">
                    <img src="/assets/img/home-page/privacy.png" alt="privacy">
                    <div class="thrd-home-part-block-reason-text">
                        <div class="thrd-home-part-block-reason-text-title">
                            Конфіденційність: 
                        </div>
                        <div class="thrd-home-part-block-reason-text-body">
                            Твоя конфіденційність на першому місці. Ти можеш бути впевнений, що твої розмови з нашими психологами є анонімними.
                        </div>
                    </div>
                </div>
            </div>

            <div class="thrd-home-part-block-middle-text">
                <p>Наші програми та психологічна підтримка допоможуть тобі знайти ключі до більш здорового та щасливого життя.</p>
                <p>Ти заслуговуєш на це, і ми готові допомогти тобі досягти цієї мети.</p>
            </div>

            <div class="thrd-home-part-block-cards">
                <div class="thrd-home-part-block-card">
                    <div class="thrd-home-part-block-card-head">
                        <img src="/assets/img/home-page/third-part-card.png" alt="third-part-card">
                    </div>
                    <div class="thrd-home-part-block-card-body">
                        <div class="thrd-home-part-block-card-body-title">
                            Психолог, психотерапевт або психіатр. До кого звернутись?
                        </div>
                        <div class="thrd-home-part-block-card-body-text">
                            Какая разніца між ними, хто краще, хто ще краще, кто тебе вилікує а хто заставить лікуватись. Короче хто лох, хто не лох, а хто взагалі хз хто. 
                        </div>
                    </div>
                    <div class="thrd-home-part-block-card-footer">
                        <button>До кого мені звернутись</button>
                    </div>
                </div>
                <div class="thrd-home-part-block-card">
                    <div class="thrd-home-part-block-card-head">
                        <img src="/assets/img/home-page/third-part-card.png" alt="third-part-card">
                    </div>
                    <div class="thrd-home-part-block-card-body">
                        <div class="thrd-home-part-block-card-body-title">
                            Як вибрати хорошого психотерапевта
                        </div>
                        <div class="thrd-home-part-block-card-body-text">
                            Там-сям, туди-сюди, тяп-ляп, тудим-судим, камень-ножиці-папер. Я кращий хлопець у всьому свому селі дєрєвні Хмельницькому.
                        </div>
                    </div>
                    <div class="thrd-home-part-block-card-footer">
                        <button>Як обрати психотерапевта</button>
                    </div>
                </div>
                <div class="thrd-home-part-block-card">
                    <div class="thrd-home-part-block-card-head">
                        <img src="/assets/img/home-page/third-part-card.png" alt="third-part-card">
                    </div>
                    <div class="thrd-home-part-block-card-body">
                        <div class="thrd-home-part-block-card-body-title">
                            Різниця між терапевтичними підходами у терапіїї
                        </div>
                        <div class="thrd-home-part-block-card-body-text">
                            Різниця між різними підходами, як КПТ, схема, гештальт, кліент-центрована, арт та інші види бездоказової терапії
                        </div>
                    </div>
                    <div class="thrd-home-part-block-card-footer">
                    <button>Як обрати підхід</button>
                    </div>
                </div>
            </div>
        </div>
    `,
    styleUrls: ["./third-home-part.scss"]
})
export class ThirdHomePartComponent {
    constructor() { }

}