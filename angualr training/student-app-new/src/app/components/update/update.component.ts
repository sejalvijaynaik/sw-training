import { Component, OnInit } from '@angular/core';
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

  id:string;
  rollNoNgModel:number;
  nameNgModel:string;
  dateNgModel:string;
  ageNgModel:number;
  emailNgModel:string;
  isMaleNgModel:boolean;

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
      this.rollNoNgModel = data[0].rollNo; 
      this.nameNgModel = data[0].name;
      this.ageNgModel = data[0].age;
      this.dateNgModel = data[0].date;
      this.emailNgModel = data[0].email;
      this.isMaleNgModel = data[0].isMale;
    });
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
}
