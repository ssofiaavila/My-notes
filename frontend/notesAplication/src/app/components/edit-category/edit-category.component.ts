import { Component, Inject } from '@angular/core';
import { NotesCategoriesComponent } from '../notes-categories/notes-categories.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryServiceService } from 'src/app/services/category-service.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent {

  /** Form group for editing a category. */
  categoryForm: FormGroup;

  /**
   * Constructs the EditCategoryComponent.
   * @param dialogRef - Reference to the dialog opened by this component.
   * @param data - Data passed to the dialog, containing the category to be edited.
   * @param fb - FormBuilder for creating and managing forms.
   * @param categoryService - Service for managing category-related functionality.
   */
  constructor(
    public dialogRef: MatDialogRef<NotesCategoriesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder, private categoryService: CategoryServiceService
  ) {
    this.categoryForm = this.fb.group({
      name: [data.category.name, [Validators.required]]
    });
  }

  /**
   * Saves changes made to the category.
   * Sends a request to update the category with the edited data.
   */
  saveChanges() {
    if (this.categoryForm.valid) {
      const updatedCategoryData = this.categoryForm.value;
  
      updatedCategoryData.id = this.data.id;
  
      this.categoryService.updateCategory(updatedCategoryData)
        .subscribe(
          (response) => {
            console.log('Categoría actualizada exitosamente:', response);
  
            this.dialogRef.close(updatedCategoryData);
          },
          (error) => {
            console.error('Error al actualizar la categoría:', error);
            
          }
        );
    }
  }
  
 
}
