import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'student-app-new';
  logInLinkShow:string;
  logoutLinkShow:string;
  
  constructor(private authService:AuthService){
    window.document.body.style.backgroundColor = 'plum';

    authService.checkLoginStatus().subscribe((data)=> {
      if(data){
        this.logInLinkShow = "none";
      this.logoutLinkShow = "inline-block";
      }
      else{
        this.logInLinkShow = "inline-block";
        this.logoutLinkShow = "none";
      }
    });
  }
}
