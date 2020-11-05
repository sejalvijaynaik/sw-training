import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from "../classes/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  users:User[];
  loginStatus:boolean;
  constructor() {
    this.populateUsers();
   }

  populateUsers():void{
    this.users = [
      {username : "admin", password : "admin"},
      {username : "sejal", password : "sejal"}, 
    ];
  }

  checkLoginDetails(username:string, password:string):boolean{
    for(let user of this.users){
      if((username == user.username)&&(password == user.password)){
        return true;
      }
    }
    return false;
  }

  logInUser(username:string, password:string){
    sessionStorage.setItem("currentUserUsername", username),
    sessionStorage.setItem("currentUserPassword", password)  
  }

  checkStatus(username:string, password:string):void{
    if((username == sessionStorage.getItem("currentUserUsername"))&&(password == sessionStorage.getItem("currentUserPassword"))){
      alert("true");
    } 
    else{
      alert("false");
    }
  }

  checkLoginStatus():Observable<boolean>{
    if(sessionStorage.getItem("currentUserUsername") != null){
      this.loginStatus = true;
    } 
    else{
      this.loginStatus = false;
    }
    let loginStatusObservable = new Observable<boolean>((observer) => {
      observer.next(this.loginStatus);
    });

    return loginStatusObservable;
  }

  logOutUser():void{
    sessionStorage.removeItem("currentUserUsername");
    sessionStorage.removeItem("currentUserPassword");
  }
}
