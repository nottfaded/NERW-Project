import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from '../components/home/home.component';
import { ContactsComponent } from '../components/contacts/contacts.component';
import { AuthComponent } from '../components/authentication/auth.component';
import { CabinetComponent } from '../components/cabinet/cabinet.component';
import { SettingComponent } from '../components/cabinet/settings/setting.component';
import { _linksAccess } from '../injectable-services/cabinet.service';
import { RoleGuard } from '../injectable-services/route-guard.service';
import { AllSessionsComponent } from '../components/cabinet/all-sessions/all-sessions.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  // { path: 'psychologists', component: PsychologistsComponent },
  // { path: 'tests', component: TestsComponent },
  // { path: 'questions', component: QuestionsComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: 'auth', component: AuthComponent },
  {
    path: 'cabinet', component: CabinetComponent,
    children: [
      {
        path: "settings",
        component: SettingComponent,
        canActivate: [RoleGuard],
        data: { roles: _linksAccess["settings"].roles }
      },
      {
        path: "all-sessions",
        component: AllSessionsComponent,
        canActivate: [RoleGuard],
        data: { roles: _linksAccess["all-sessions"].roles }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

