import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from 'src/app/classes/student';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  @ViewChild('formModalBtn') formModalBtn:ElementRef;
  id:string;
  isMale:boolean;

  updateForm:FormGroup;
  rollNo:FormControl;
  name:FormControl;
  age:FormControl;
  date:FormControl;
  email:FormControl;
  gender:FormControl;
  studentAPI:Student;

  constructor(private studentService:StudentService, 
    private activatedRoute:ActivatedRoute,
    private router:Router) { }
  
    ngOnInit(): void {
      this.activatedRoute.paramMap.subscribe(()=>{
        this.id = this.activatedRoute.snapshot.paramMap.get("id");
        this.prepopulate();
        this.createFormControls();
        this.createForm();
      });
    }

    ngAfterViewInit() {
      this.formModalBtn.nativeElement.click();
    }
  
    createFormControls():void{
      this.rollNo = new FormControl("", Validators.required);
      this.name = new FormControl("", Validators.required);
      this.age = new FormControl("", Validators.required);
      this.date = new FormControl("", Validators.required);
      this.email = new FormControl("", [
        Validators.required,
        Validators.pattern("[^ @]*@[^ @]*")
      ]);
      this.gender = new FormControl();
    }

    createForm():void{
      this.updateForm = new FormGroup({
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
      if(this.updateForm.valid){
        this.updateStudent();
      }
    }

  prepopulate():void{
    this.studentService.getStudent(this.id).subscribe((data)=>{
      this.id = data[0].id; 

      this.updateForm.patchValue({
        name: data[0].name,
        rollNo: data[0].rollNo,
        age: data[0].age,
        date: data[0].date,
        email: data[0].email
      });
      this.isMale = data[0].isMale;
    },
    (err) => console.log('HTTP Error', err)
    );
  }

  updateStudent():void{
    
    let isMale:boolean = true;

    if(this.gender.value == 'female'){
      isMale = false;
    }

    let student:Student = new Student(this.id, 
                                  this.name.value, 
                                  this.rollNo.value, 
                                  this.age.value, 
                                  this.date.value, 
                                  this.email.value, 
                                  isMale);
    this.studentService.updateStudent(student).subscribe((data)=>{
      this.router.navigate(["/list"]);
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
    this.updateForm.patchValue({
      age: ageTotal,
    });
  }
}
