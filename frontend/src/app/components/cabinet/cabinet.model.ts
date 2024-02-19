import { NgModule } from '@angular/core';
import { CabinetComponent } from './cabinet.component';
import { SettingComponent } from './settings/setting.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from '../../main-app/app-routing.module';
import { AllSessionsComponent } from './all-sessions/all-sessions.component';
import { SessionInfo } from './all-sessions/sub-components/session-info/session-info.component';

@NgModule({
    imports: [CommonModule, FormsModule, AppRoutingModule],
    exports: [],
    declarations: [CabinetComponent, SettingComponent, AllSessionsComponent,
        SessionInfo
    ],
    providers: [],
})
export class CabinetModule { }
