import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from '../components/home/home.component';
import { ContactsComponent } from '../components/contacts/contacts.component';
import { AuthComponent } from '../components/authentication/auth.component';
import { CabinetComponent } from '../components/cabinet/cabinet.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  // { path: 'psychologists', component: PsychologistsComponent },
  // { path: 'tests', component: TestsComponent },
  // { path: 'questions', component: QuestionsComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'cabinet', component: CabinetComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
