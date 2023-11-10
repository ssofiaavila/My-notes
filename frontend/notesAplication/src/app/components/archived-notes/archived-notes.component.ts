import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { DialogNoteComponent } from '../dialog-note/dialog-note.component';
import { Nota } from 'src/app/models/Note';
import { CreateNoteComponent } from '../create-note/create-note.component';
import { NotesService } from 'src/app/services/notes.service';
import { CategoryServiceService } from 'src/app/services/category-service.service';

@Component({
  selector: 'app-archived-notes',
  templateUrl: './archived-notes.component.html',
  styleUrls: ['./archived-notes.component.css']
})
export class ArchivedNotesComponent {
  /** Array containing archived notes. */
  notas: Nota[] = [];
  /** Selected category for filtering archived notes. */
  selectedCategory: number = 0;
  /** Array containing note categories. */
  categories: any[] = [];



  /**
     * Constructs the ArchivedNotesComponent.
     * @param dialog - Angular Material dialog service.
     * @param userService - User service for managing user-related functionality.
     * @param noteService - Service for managing note-related functionality.
     * @param categoryService - Service for managing category-related functionality.
     */

  constructor(private dialog: MatDialog, public userService: UserService, private noteService: NotesService, private categoryService: CategoryServiceService) { }


  /**
   * Lifecycle hook that is called after data-bound properties of a directive are initialized.
   * It gets categories and archived notes for the user.
   */
  ngOnInit() {
    const userId = this.userService.getUserId();

    this.categoryService.getCategories().subscribe(
      (categories) => {
        this.categories = categories;

        // Obtener notas por usuario
        this.noteService.getNotesByUser(userId).subscribe(
          (notas) => {
            // Filtrar solo las notas activas
            this.notas = notas.filter(nota => nota.isArchived);
          },
          (error) => {
            console.error('Error fetching notes:', error);
          }
        );
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }


  /**
  * Unarchives a note with the given ID.
  * @param noteId - The ID of the note to be unarchived.
  */
  desarchivarNota(noteId: number) {
    this.noteService.unarchiveNote(noteId).subscribe(res => {
      const userId = this.userService.getUserId();
      this.noteService.getNotesByUser(userId).subscribe(
        (notas) => {
          // Filtrar solo las notas activas
          this.notas = notas.filter(nota => nota.isArchived);
        },
        (error) => {
          console.error('Error fetching notes:', error);
        }
      );
    });
  }

  /**
  * Deletes a note with the given ID.
  * @param noteId - The ID of the note to be deleted.
  */
  deleteNote(noteId: number) {
    this.noteService.deleteNote(noteId).subscribe
      (res => {
        const userId = this.userService.getUserId();
        this.noteService.getNotesByUser(userId).subscribe(
          (notas) => {
            // Filtrar solo las notas activas
            this.notas = notas.filter(nota => !nota.isArchived);
          },
          (error) => {
            console.error('Error fetching notes:', error);
          }
        );
      });
  }

  /**
   * Opens a dialog for editing a note.
   * @param nota - The note to be edited.
   */
  editNote(nota: Nota) {
    const dialogRef = this.dialog.open(DialogNoteComponent, {
      width: '400px',
      height: '650px',
      data: nota
    });

    dialogRef.afterClosed().subscribe(res => {
      const userId = this.userService.getUserId();
      this.noteService.getNotesByUser(userId).subscribe(
        (notas) => {
          // Filtrar solo las notas activas
          this.notas = notas.filter(nota => nota.isArchived);
        },
        (error) => {
          console.error('Error fetching notes:', error);
        }
      );
    });
  }


}
