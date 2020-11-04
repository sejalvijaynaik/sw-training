import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Student } from 'src/app/classes/student';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student-crud',
  templateUrl: './student-crud.component.html',
  styleUrls: ['./student-crud.component.css']
})
export class StudentCrudComponent implements OnInit {

  students:Student[] = [];

  id:string;
  isMale:boolean = null;
  addForm:FormGroup;
  rollNo:FormControl;
  name:FormControl;
  age:FormControl;
  date:FormControl;
  email:FormControl;
  gender:FormControl;
  studentAPI:Student;
  addOrUpdateAction:string;
  
  constructor(private studentService:StudentService, private router:Router) { 
  }
  
  ngOnInit(): void {
    this.createFormControls();
    this.createForm();
    this.getStudents();
  }

  getStudents():void{
    this.studentService.getStudents().subscribe((data)=>{
      this.students = data;
    },
    (err) => console.log('HTTP Error', err)
    );
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
      if(this.addOrUpdateAction == "add"){
        this.addStudent();
      }
      else{
        this.updateStudent();
      }
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
    this.studentService.addStudent(this.studentAPI).subscribe(data=>{
      this.addForm.reset();
    },
    (err) => console.log('HTTP Error', err)
    );
    }

    refreshAddForm():void{
      this.addForm.reset();
    }

    dobChange():void{
      let dobDate:Date = new Date(this.date.value);
      let diff = (new Date().getTime() - dobDate.getTime());
      let ageTotal = Math.trunc(diff/ (1000 * 3600 * 24 *365));
      this.addForm.patchValue({
        age: ageTotal,
      });
    }

    setAddAction():void{
      this.addOrUpdateAction = "add";
    }

    prepopulate(id:string):void{
      this.addOrUpdateAction = "update";
      this.studentService.getStudent(id).subscribe((data)=>{
        this.id = data[0].id; 
  
        this.addForm.patchValue({
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
        this.addForm.reset();
      },
      (err) => console.log('HTTP Error', err)
      );
    }

    deleteStudent(id:string):void{
      if(confirm("Are you sure to delete?")) {
        this.studentService.deleteStudent(id).subscribe((data)=>{
        },
        (err) => console.log('HTTP Error', err)
        );
      }
    }
}
