import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

/**
 * Service for managing note categories.
 */
@Injectable({
  providedIn: 'root'
})
export class CategoryServiceService {

  private apiUrl = 'http://localhost:5086/api/NoteCategories'; 

  /**
   * Constructs a new CategoryServiceService.
   * @param http The HttpClient service for making HTTP requests.
   * @param userService The UserService for user-related operations.
   */
  constructor(private http: HttpClient, private userService: UserService) {}

  /**
   * Retrieves all note categories.
   * @returns An Observable containing an array of note categories.
   */
  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  /**
   * Creates a new note category.
   * @param category The category data to create.
   * @returns An Observable containing the created category.
   */
  createCategory(category: any): Observable<any> {
    category.userId = this.userService.getUserId();
    console.log(category);
    return this.http.post<any>(this.apiUrl, category);
  }

  /**
   * Updates an existing note category.
   * @param updatedCategory The updated category data.
   * @returns An Observable containing the updated category.
   */
  updateCategory(updatedCategory: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${updatedCategory.id}`, updatedCategory);
  }

  /**
   * Deletes a note category.
   * @param categoryId The ID of the category to delete.
   * @returns An Observable indicating the success of the deletion.
   */
  deleteCategory(categoryId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${categoryId}`);
  }
}
