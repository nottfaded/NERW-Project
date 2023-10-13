import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/MainApp/app.module';


platformBrowserDynamic().bootstrapModule(AppModule).catch(err => console.error(err));

export const API_URL = 'https://localhost:7265/api/';