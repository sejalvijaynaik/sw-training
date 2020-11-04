import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Student } from 'src/app/classes/student';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  @ViewChild('formModalBtn') formModalBtn:ElementRef;
  addForm:FormGroup;
  rollNo:FormControl;
  name:FormControl;
  age:FormControl;
  date:FormControl;
  email:FormControl;
  gender:FormControl;
  studentAPI:Student;

  constructor(private studentApiService:StudentService, private router:Router) { }

  ngOnInit(): void {
    this.createFormControls();
    this.createForm();
    
  }

  ngAfterViewInit() {
    this.formModalBtn.nativeElement.click();
  }

  createFormControls():void{
    this.rollNo = new FormControl("", Validators.required);
    this.name = new FormControl("", [
      Validators.required,
      Validators.pattern("^[a-zA-Z_ ]+$")
    ]);
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

  validate():void{
    if(this.rollNo.invalid){
      this.rollNo.markAsDirty();
    }
    if(this.name.invalid){
      this.name.markAsDirty();
    }
    if(this.date.invalid){
      this.date.markAsDirty();
    }
    if(this.age.invalid){
      this.age.markAsDirty();
    }
    if(this.email.invalid){
      this.email.markAsDirty();
    }
    if(this.gender.invalid){
      this.gender.markAsDirty();
    }
    if(this.addForm.valid){
      this.addStudent();
    }
  }

  addStudent():void{

    let isMale:boolean = true;

    if(this.gender.value == 'female'){
      isMale = false;
    }
    this.studentAPI = {id:null, 
                      rollNo:this.rollNo.value, 
                      name:this.name.value, 
                      age:this.age.value, 
                      email:this.email.value, 
                      isMale:isMale, 
                      date:this.date.value};
    this.studentApiService.addStudent(this.studentAPI).subscribe(data=>{
      this.rediresctToList();
    },
    (err) => console.log('HTTP Error', err)
    );
    }

    rediresctToList():void{
      this.router.navigate(["/list"]);
    }

    dobChange():void{
      let dobDate:Date = new Date(this.date.value);
      let diff = (new Date().getTime() - dobDate.getTime());
      let ageTotal = Math.trunc(diff/ (1000 * 3600 * 24 *365));
      this.addForm.patchValue({
        age: ageTotal,
      });
    }
}

