import { Component, Inject } from '@angular/core';
import { IndexComponent } from '../index/index.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryServiceService } from 'src/app/services/category-service.service';
import { NotesService } from 'src/app/services/notes.service';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NoteCategory } from 'src/app/models/NoteCategory';
@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.css']
})
export class CreateNoteComponent {
  /** Form group for the note creation form. */
  noteForm!: FormGroup;
  /** Array containing note categories. */
  categories: NoteCategory[] = [];


  /**
   * Constructs the CreateNoteComponent.
   * @param dialogRef - Reference to the dialog opened by this component.
   * @param categoryService - Service for managing category-related functionality.
   * @param noteService - Service for managing note-related functionality.
   * @param userService - User service for managing user-related functionality.
   * @param fb - FormBuilder for creating and managing forms.
   */
  constructor(
    public dialogRef: MatDialogRef<CreateNoteComponent>,
    private categoryService: CategoryServiceService,
    private noteService: NotesService, public userService: UserService, private fb: FormBuilder,
  ) { }

  /**
   * Lifecycle hook that is called after data-bound properties of a directive are initialized.
   * Initializes the note creation form and loads categories.
   */
  ngOnInit() {
    this.initializeForm();
    this.loadCategories();
  }

  /**
   * Initializes the note creation form.
   */
  initializeForm() {
    this.noteForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      noteCategoryId: [null, Validators.required], 
      isArchived: [false],
      userId: this.userService.getUserId(),
    });
  }

  /**
   * Loads categories for the note creation form.
   */
  loadCategories() {
    this.categoryService.getCategories().subscribe(
      (categories: NoteCategory[]) => {
        this.categories = categories;
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  /**
   * Saves the created note.
   * If the note form is valid, it sends a request to create the note.
   */
  saveNote() {
    if (this.noteForm.valid) {
      const noteData = this.noteForm.value;
      this.noteService.createNote(noteData).subscribe(
        (response) => {
          console.log('Note created successfully:', response);
          this.dialogRef.close(); 
        },
        (error) => {
          console.error('Error creating note:', error);
        }
      );
    }
  }

  /**
   * Closes the note creation dialog.
   */
  closeDialog(): void {
    this.dialogRef.close(); 
  }
}
