import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.scss']
})
export class AppComponent {

}

export const getCurrentDateTime = () => {
  let localDate = new Date();
  let offset = localDate.getTimezoneOffset();
  let kievDate = new Date(localDate.getTime() + (offset + 120) * 60000);

  return kievDate;
}