import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from '../Components/Home/home.component';
import { ContactsComponent } from '../Components/Contacts/contacts.component';
import { AuthComponent } from '../Components/Authentication/auth.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  // { path: 'psychologists', component: PsychologistsComponent },
  // { path: 'tests', component: TestsComponent },
  // { path: 'questions', component: QuestionsComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: 'auth', component: AuthComponent, },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
