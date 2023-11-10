import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User, UserWithId } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  /**
   * Constructor to inject services and dependencies.
   * @param userService UserService for managing user-related operations.
   * @param route Router for navigating between views.
   */
  constructor(private userService:UserService,private route: Router,){

  }

   /** Form group for login form. */

  loginForm=new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })


  /** Attempts to log in the user with the provided credentials. */

  loginUser(){
    var user: User = { 
      username:this.loginForm.get('username')!.value!,
      password:this.loginForm.get('password')!.value!,
    };
    this.userService.login(user).subscribe(
      (res:UserWithId) => {  
        this.userService.setUser(res);
        this.route.navigate(['/myNotes'])
      
        
        
      },
      (error:Error)=>{
      }
    );
  }

/**
   * Gets the form control for the username.
   * @returns The form control for the username.
   */
  get Username():FormControl{
    return this.loginForm.get('username') as FormControl;
  }

  /**
   * Gets the form control for the password.
   * @returns The form control for the password.
   */
  get Password():FormControl{
    return this.loginForm.get('password') as FormControl;
  }
}
