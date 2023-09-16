import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: "home-page",
    template: `
    <header></header>
    <div class="home-page f-jost" [ngClass]="classTheme">
        HOME
    </div>`,
    styleUrls:['../../styles.scss']
})

export class HomeComponent { 
    @Input() classTheme: string = '';
    @Output() toggleTheme = new EventEmitter();

}