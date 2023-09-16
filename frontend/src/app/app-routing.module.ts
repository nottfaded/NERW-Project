import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './Home/home.component';
import { ContactsComponent } from './Contacts/contacts.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  // { path: 'psychologists', component: PsychologistsComponent },
  // { path: 'tests', component: TestsComponent },
  // { path: 'questions', component: QuestionsComponent },
  { path: 'contacts', component: ContactsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
