import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('formModalBtn') formModalBtn:ElementRef;
  addForm:FormGroup;
  rollNo:FormControl;
  name:FormControl;

  constructor() { }

  ngOnInit(): void {
  }

  createFormControls():void{
    this.rollNo = new FormControl("", Validators.required);
    this.age = new FormControl("", Validators.required);
    this.date = new FormControl("", Validators.required);
    this.email = new FormControl("", [
      Validators.required,
      Validators.pattern("[^ @]*@[^ @]*")
    ]);
    this.gender = new FormControl("", Validators.required);
  }

  createForm():void{
    this.addForm = new FormGroup({
      name : this.name,
      age : this.age,
      rollNo : this.rollNo,
      email :this.email,
      gender : this.gender,
      date : this.date,
    });
  }

}
