import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User, UserWithId } from '../models/User';

/**
 * Service for user-related operations, such as login and authentication.
 */
@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  /**
   * Constructs a new UserService.
   * @param http The HttpClient service for making HTTP requests.
   */
  constructor(private http: HttpClient) { }

  /**
   * Logs in a user.
   * @param user The user data for login.
   * @returns An Observable containing the user with additional ID information.
   */
  login(user: User): Observable<UserWithId> {
    return this.http.post<UserWithId>(`http://localhost:5086/api/Users/login`, user);
  }

  /**
   * Sets the user in the local storage after a successful login.
   * @param user The user data with ID information.
   */
  setUser(user: UserWithId): void {
    localStorage.setItem('id', user.id.toString());
    localStorage.setItem('username', user.username);
  }

  /**
   * Logs out the current user by removing user information from local storage.
   */
  logout(): void {
    localStorage.removeItem('id');
    localStorage.removeItem('username');
  }

  /**
   * Checks if a user is logged in.
   * @returns True if a user is logged in; otherwise, false.
   */
  isLogged(): boolean {
    return localStorage.getItem('username') != null;
  }

  /**
   * Gets the ID of the logged-in user.
   * @returns The user ID, or 0 if no user is logged in.
   */
  getUserId(): number {
    const userIdString = localStorage.getItem('id');
    return userIdString ? +userIdString : 0;
  }
}
