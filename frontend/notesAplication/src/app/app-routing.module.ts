import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { IndexComponent } from './components/index/index.component';
import { ArchivedNotesComponent } from './components/archived-notes/archived-notes.component';
import { NotesCategoriesComponent } from './components/notes-categories/notes-categories.component';

const routes: Routes = [
  { path: "" , component: LoginComponent },
  { path: "myNotes", component: IndexComponent},
  {path: "archivedNotes", component:ArchivedNotesComponent},
  {path:"noteCategories", component: NotesCategoriesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
