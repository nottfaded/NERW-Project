import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: "contacts-page",
    template: `
    <header [activePage]="'contacts'"></header>
    <div class="contacts-page" [ngClass]="classTheme">
        CONTACTS {{classTheme}}
    </div>`,
    styleUrls:[]
})

export class ContactsComponent { 
    @Input() classTheme: string = '';
    @Output() toggleTheme = new EventEmitter();

}