import { Component, ElementRef, ViewChild } from '@angular/core';

interface ImageState    {
    src: string;
    state: 'hovered' | 'notHovered';
    title: string;
    text: string;
}

@Component({
    selector: 'scnd-home-part',
    template: `
        <div class="scnd-home-part">
            <div class="scnd-home-part-images">
                <div *ngFor="let image of images; let i = index">
                    <div class="scnd-home-part-images-item" (mouseenter)="image.state = 'hovered'" (mouseleave)="image.state = 'notHovered'">
                        <div class="scnd-home-part-images-item-imgs">
                            <img [src]="'/assets/img/home-page/' + image.src + '-opacity' + '.png'" [alt]="image.src" [ngClass]="image.state">
                            <img [src]="'/assets/img/home-page/' + image.src + '.png'" [alt]="image.src">
                        </div>
                        <div class="scnd-home-part-images-item-title">
                            {{image.title}}
                        </div>
                        <div [innerHTML]="image.text" class="scnd-home-part-images-item-body"> </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    styleUrls: ["./second-home-part.scss"]
})
export class SecondHomePartComponent {
    images: ImageState[] = [
        {src: "depression-apathy", title: "Побороти депресію та апатію", text: "Поверни собі радість життя та <br> відчуття задоволення", state: 'notHovered'},
        {src: "anxiety-and-stress", title: "Подолати тривогу і стрес", text: "Навчись керувати своїм емоційним <br> станом та стресом", state: 'notHovered'},
        {src: "fight-fear", title: "Впоратись зі страхом", text: "Подолай страхи та фобії, що <br> заважають жити повним життям", state: 'notHovered'},
        {src: "personality-development", title: "Розвиток особистості", text: "Знайди себе, розкрий потенціал, <br> та досягай своїх цілей", state: 'notHovered'},
        {src: "build-relationships", title: "Побудувати стосунки", text: "Приведи свої стосунки  до ладу, <br> або гармонічно побудуй нові", state: 'notHovered'},
        {src: "self-esteem", title: "Підвищити самооцінку", text: "Прийми себе та позбудься невпевненості <br> яка заважає щасливо жити", state: 'notHovered'},
    ]

    constructor() { }
}