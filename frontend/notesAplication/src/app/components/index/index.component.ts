import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Nota } from 'src/app/models/Note';
import { DialogNoteComponent } from '../dialog-note/dialog-note.component';
import { UserService } from 'src/app/services/user.service';
import { CreateNoteComponent } from '../create-note/create-note.component';
import { NotesService } from 'src/app/services/notes.service';
import { CategoryServiceService } from 'src/app/services/category-service.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {
  /** Array to store active notes. */
  notas: Nota[] = [];

  /** Array to store categories. */
  categories: any[] = [];

  /** Selected category filter. */
  selectedCategory: number = 0;


  /**
   * Constructor to inject services and dependencies.
   * @param dialog MatDialog service for opening dialogs.
   * @param userService UserService for managing user-related operations.
   * @param noteService NotesService for managing note-related operations.
   * @param categoryService CategoryServiceService for managing category-related operations.
   */
  constructor(private dialog: MatDialog, public userService: UserService, private noteService: NotesService, private categoryService: CategoryServiceService) { }


  /**
   * Lifecycle hook called after component initialization.
   * Fetches categories and notes for the user.
   */
  ngOnInit() {
    const userId = this.userService.getUserId();

    this.categoryService.getCategories().subscribe(
      (categories) => {
        this.categories = categories;

        this.noteService.getNotesByUser(userId).subscribe(
          (notas) => {
            this.notas = notas.filter(nota => !nota.isArchived);
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
   * Deletes a note by its ID.
   * @param noteId ID of the note to be deleted.
   */
  deleteNote(noteId: number) {
    this.noteService.deleteNote(noteId).subscribe
      (res => {
        const userId = this.userService.getUserId();
        this.noteService.getNotesByUser(userId).subscribe(
          (notas) => {
            this.notas = notas.filter(nota => !nota.isArchived);
          },
          (error) => {
            console.error('Error fetching notes:', error);
          }
        );
      });
  }


  /**
  * Archives a note by its ID.
  * @param noteId ID of the note to be archived.
  */
  archiveNote(noteId: number) {
    this.noteService.archiveNote(noteId).subscribe(res => {
      const userId = this.userService.getUserId();
      this.noteService.getNotesByUser(userId).subscribe(
        (notas) => {
          this.notas = notas.filter(nota => !nota.isArchived);
        },
        (error) => {
          console.error('Error fetching notes:', error);
        }
      );
    });
  }

  /**
     * Opens a dialog to edit a note.
     * @param nota The note to be edited.
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
          this.notas = notas.filter(nota => !nota.isArchived);
        },
        (error) => {
          console.error('Error fetching notes:', error);
        }
      );
    });
  }

  /**
   * Opens a dialog to create a new note.
   */
  crearNota() {
    const dialogRef = this.dialog.open(CreateNoteComponent, {
      width: '400px',
      height: '650px',
    });
    dialogRef.afterClosed().subscribe(res => {
      const userId = this.userService.getUserId();
      this.noteService.getNotesByUser(userId).subscribe(
        (notas) => {
          this.notas = notas.filter(nota => !nota.isArchived);
        },
        (error) => {
          console.error('Error fetching notes:', error);
        }
      );
    });

  }

}
