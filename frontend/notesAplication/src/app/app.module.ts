import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component'; // Importa BrowserAnimationsModule
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms'; // Esto también podría ser necesario si estás utilizando formularios
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { IndexComponent } from './components/index/index.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { NoteDetailComponent } from './components/note-detail/note-detail.component';
import { DialogNoteComponent } from './components/dialog-note/dialog-note.component';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { CreateNoteComponent } from './components/create-note/create-note.component';
import { ArchivedNotesComponent } from './components/archived-notes/archived-notes.component';
import { NotesCategoriesComponent } from './components/notes-categories/notes-categories.component';
import { EditCategoryComponent } from './components/edit-category/edit-category.component';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FilterByCategoryPipe } from './filters/filter-by-category.pipe'; // Asegúrate de importar otros módulos necesarios de Material


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    IndexComponent,
    NoteDetailComponent,
    DialogNoteComponent,
    CreateNoteComponent,
    ArchivedNotesComponent,
    NotesCategoriesComponent,
    EditCategoryComponent,
    FilterByCategoryPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    BrowserModule,
    HttpClientModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatTableModule,
    MatDialogModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatSelectModule

    
  ],
  providers: [
    
    // ... otros proveedores
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
