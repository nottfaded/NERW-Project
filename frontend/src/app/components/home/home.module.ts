import { NgModule } from '@angular/core';

import { HomeComponent } from './home.component';
import { FirstHomePageComponent } from './parts/first-part/first-home-part.component';
import { HeaderComponent } from '../header/header.component';
import { AppRoutingModule } from '../../main-app/app-routing.module';
import { CommonModule } from '@angular/common';
import { SecondHomePartComponent } from './parts/second-part/second-home-part.component';
import { ThirdHomePartComponent } from './parts/third-part/third-home-part.component';
import { FooterComponent } from '../footer/footer.component';
import { FourthHomePartComponent } from './parts/fourth-part/fourth-home-part.component';

@NgModule({
  declarations: [
    HomeComponent, FirstHomePageComponent, SecondHomePartComponent, ThirdHomePartComponent, FourthHomePartComponent,
    HeaderComponent, FooterComponent
  ],
  imports: [
    AppRoutingModule, CommonModule
  ],
  exports: [HeaderComponent, FooterComponent]
})
export class HomeModule { }