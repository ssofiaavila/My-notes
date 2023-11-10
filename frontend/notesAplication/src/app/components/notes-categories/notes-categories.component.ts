import { Component } from '@angular/core';
import { EditCategoryComponent } from '../edit-category/edit-category.component';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryServiceService } from 'src/app/services/category-service.service';

@Component({
  selector: 'app-notes-categories',
  templateUrl: './notes-categories.component.html',
  styleUrls: ['./notes-categories.component.css']
})
export class NotesCategoriesComponent {

  /** Form group for category-related operations. */
  categoryForm: FormGroup;

  /** Displayed columns in the table. */
  displayedColumns: string[] = ['name', 'edit', 'delete'];

  /** List of categories. */
  categories: any[] = [];


  /**
  * Constructor to inject services and dependencies.
  * @param dialog MatDialog for opening dialogs.
  * @param fb FormBuilder for creating form groups.
  * @param categoryService CategoryServiceService for managing category-related operations.
  */
  constructor(private dialog: MatDialog, private fb: FormBuilder, private categoryService: CategoryServiceService) {
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required]]
    });
  }
  /** Initializes the component by loading categories. */

  ngOnInit() {
    this.loadCategories();
  }

  /** Loads categories from the service. */

  loadCategories() {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  /**
     * Opens the dialog to edit a category.
     * @param id The ID of the category to edit.
     */
  editCategory(id: number) {
    const categoryToEdit = this.categories.find(category => category.id === id);

    const dialogRef = this.dialog.open(EditCategoryComponent, {
      width: '400px',
      height: '650px',
      data: { id, category: categoryToEdit }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.categories.findIndex(category => category.id === id);
        this.categories[index] = result;

        this.categories = [...this.categories];
      }
    });
  }

  /**
   * Deletes a category.
   * @param id The ID of the category to delete.
   */
  deleteCategory(id: number) {
    this.categoryService.deleteCategory(id).subscribe(
      () => {
        this.categories = this.categories.filter(category => category.id !== id);
      },
      error => {
        console.error('Error al eliminar la categoría:', error);
      }
    );
  }

  /** Creates a new category based on the form data. */

  createCategory() {
    if (this.categoryForm.valid) {
      const categoryData = this.categoryForm.value;

      this.categoryService.createCategory(categoryData).subscribe((newCategory) => {
        this.loadCategories();
        this.categoryForm.reset();
      });
    }
  }
}
