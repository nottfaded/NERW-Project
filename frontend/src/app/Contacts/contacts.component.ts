import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: "contacts-page",
    template: `
    <header></header>
    <div class="contacts-page f-jost" [ngClass]="classTheme">
        CONTACTS
    </div>`,
    styleUrls:['../../styles.scss']
})

export class ContactsComponent { 
    @Input() classTheme: string = '';
    @Output() toggleTheme = new EventEmitter();

}