import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Nota } from '../models/Note';

/**
 * Service for managing notes.
 */
@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private apiUrl = 'http://localhost:5086/api/Notes';

  /**
   * Constructs a new NotesService.
   * @param http The HttpClient service for making HTTP requests.
   */
  constructor(private http: HttpClient) { }

  /**
   * Creates a new note.
   * @param note The note data to create.
   * @returns An Observable containing the created note.
   */
  createNote(note: any): Observable<any> {
    console.log(note)
    return this.http.post<any>(this.apiUrl, note);
  }

  /**
   * Retrieves notes belonging to a specific user.
   * @param userId The ID of the user.
   * @returns An Observable containing an array of notes.
   */
  getNotesByUser(userId: number): Observable<Nota[]> {
    return this.http.get<Nota[]>(`${this.apiUrl}/ByUser/${userId}`);
  }

  /**
   * Updates an existing note.
   * @param note The updated note data.
   * @returns An Observable containing the updated note.
   */
  updateNote(note: any): Observable<any> {
    console.log(note);
    const url = `${this.apiUrl}/${note.id}`;
    return this.http.put<any>(url, note);
  }

  /**
   * Archives a note.
   * @param noteId The ID of the note to archive.
   * @returns An Observable indicating the success of the operation.
   */
  archiveNote(noteId: number): Observable<any> {
    const url = `${this.apiUrl}/archive/${noteId}`;
    return this.http.put<any>(url, null);
  }

  /**
   * Unarchives a note.
   * @param noteId The ID of the note to unarchive.
   * @returns An Observable indicating the success of the operation.
   */
  unarchiveNote(noteId: number): Observable<any> {
    const url = `${this.apiUrl}/unarchive/${noteId}`;
    return this.http.put<any>(url, null);
  }

  /**
   * Deletes a note.
   * @param noteId The ID of the note to delete.
   * @returns An Observable indicating the success of the deletion.
   */
  deleteNote(noteId: number): Observable<any> {
    const url = `${this.apiUrl}/${noteId}`;
    return this.http.delete<any>(url);
  }
}
