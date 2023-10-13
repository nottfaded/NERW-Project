import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from '../Components/Header/header.component';
import { HomeComponent } from '../Components/Home/home.component';
import { ContactsComponent } from '../Components/Contacts/contacts.component';
import { AuthComponent } from '../Components/Authentication/auth.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtInterceptor } from '../Interceptor/jwt-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent, HomeComponent, ContactsComponent, AuthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
