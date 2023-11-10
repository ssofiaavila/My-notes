import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Importa FormBuilder y FormGroup
import { Nota } from 'src/app/models/Note';
import { NotesService } from 'src/app/services/notes.service';
import { CategoryServiceService } from 'src/app/services/category-service.service';
import { NoteCategory } from 'src/app/models/NoteCategory';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dialog-note',
  templateUrl: './dialog-note.component.html',
  styleUrls: ['./dialog-note.component.css']
})
export class DialogNoteComponent {

    /** Form group for editing a note. */
    notaForm: FormGroup;
    /** Array containing note categories. */
    categorias: NoteCategory[] = [];
  
    /**
   * Constructs the DialogNoteComponent.
   * @param dialogRef - Reference to the dialog opened by this component.
   * @param data - Data passed to the dialog, containing the note to be edited.
   * @param noteService - Service for managing note-related functionality.
   * @param fb - FormBuilder for creating and managing forms.
   * @param categoryService - Service for managing category-related functionality.
   * @param userService - User service for managing user-related functionality.
   */
  constructor(
    public dialogRef: MatDialogRef<DialogNoteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Nota,
    private noteService: NotesService,
    private fb: FormBuilder, private categoryService: CategoryServiceService, public userService: UserService// Inyecta FormBuilder
  ) {
    console.log(data)
    this.notaForm = this.fb.group({
      name: [data.name, Validators.required], 
      description: [data.description, Validators.required],
      noteCategoryId: [data.noteCategory.id, Validators.required], 
      isArchived: [data.isArchived],
      userId: this.userService.getUserId(),
    });
    this.loadCategories(); 
  }

  /**
   * Loads categories for the note editing form.
   */
  loadCategories() {
    this.categoryService.getCategories().subscribe(
      (categories) => {
        this.categorias = categories;
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  /**
   * Saves changes made to the note.
   * Sends a request to update the note with the edited data.
   */
  saveChanges() {
    const updatedNoteData = this.notaForm.value;

    updatedNoteData.id = this.data.id;

    this.noteService.updateNote(updatedNoteData).subscribe(
      (response) => {
        console.log('Note updated successfully:', response);
        this.dialogRef.close(); 
      },
      (error) => {
        console.error('Error updating note:', error);
      }
    );
  }

  /**
   * Closes the note editing dialog.
   */
  closeDialog(): void {
    this.dialogRef.close(); 
  }
}
