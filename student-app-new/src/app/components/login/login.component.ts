import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('formModalBtn') formModalBtn:ElementRef;
  @ViewChild('loginModal') loginModal:ElementRef;
  loginMessageShow:string = "none";
  loginForm:FormGroup;
  username:FormControl;
  password:FormControl;

  constructor(private router:Router, private authService:AuthService) { }

  ngOnInit(): void {
    this.createFormControls();
    this.createForm();
  }

  ngAfterViewInit() {
    this.loginModal.nativeElement.style.display = "block";
  }

  createFormControls():void{
    this.username = new FormControl("", Validators.required);
    this.password = new FormControl("", Validators.required);
  }

  createForm():void{
    this.loginForm = new FormGroup({
      username : this.username,
      password : this.password,
    });
  }

  rediresctToList():void{
    this.router.navigate(["/list"]);
  }

  validate():void{
    if(this.authService.checkLoginDetails(this.username.value, this.password.value) == true){
      this.authService.logInUser(this.username.value, this.password.value);
      window.location.href = "http://localhost:4200/list";
    }
    else{
      console.log("login incorrect");
      this.loginModal.nativeElement.style.display = "block";
      this.loginMessageShow = "block";
    }
  }
}
