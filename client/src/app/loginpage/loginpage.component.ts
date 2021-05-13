import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

// import {User} from '../models/user.model';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css'],
  providers: [AuthService]
})
export class LoginpageComponent implements OnInit{
  
  constructor(private Auth: AuthService,private router:Router){}

  ngOnInit(){

  }

  loginUser(event){
    event.preventDefault();
    const target = event.target
    const email = target.querySelector('#email').value
    const password = target.querySelector('#password').value

     this.Auth.getUserDetails(email,password).subscribe(data => {
       if(data.success){
          this.router.navigate(['home'])
          this.Auth.setLoggedIn(true)
       }else{
         window.alert(data.message)
       }
     })
    console.log(email,password)
  }



  
  
}
