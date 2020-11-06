import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormControl } from '@angular/forms';
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
  addForm:any;
  studentAPI:Student;
  addOrUpdateAction:string;
  
  constructor(
    private studentService:StudentService, 
    private router:Router, 
    private formBuilder:FormBuilder
    ) { 
      this.addForm = this.formBuilder.group({
        rollNo: ['', Validators.required],
        name: ['', [Validators.required,  Validators.pattern("^[a-zA-Z_ ]+$")]],
        age: ['', Validators.required],
        date: ['', Validators.required],
        gender: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]]
      });
  }
  
  ngOnInit(): void {
    this.getStudents();
   }

  getStudents():void{
    this.studentService.getStudents().subscribe((data)=>{
      this.students = data;
    },
    (err) => console.log('HTTP Error', err)
    );
  }

  validate():void{
  
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

    if(this.addForm.get('gender').value == 'female'){
      isMale = false;
    }
    this.studentAPI = {id:null, 
                      rollNo:this.addForm.get('rollNo').value, 
                      name:this.addForm.get('name').value, 
                      age:this.addForm.get('age').value, 
                      email:this.addForm.get('email').value, 
                      isMale:isMale, 
                      date:this.addForm.get('date').value};
    this.studentService.addStudent(this.studentAPI).subscribe(data=>{
      this.addForm.reset();
      this.getStudents();
      alert("Student added");
    },
    (err) => console.log('HTTP Error', err)
    );
    }

    refreshAddForm():void{
      this.addForm.reset();
    }

    dobChange():void{
      let dobDate:Date = new Date(this.addForm.controls['date'].value);
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
      
      let gender:string;
      this.addOrUpdateAction = "update";
      this.studentService.getStudent(id).subscribe((data)=>{
        
        this.id = data[0].id; 
        if(data[0].isMale == true){
          gender = "male";
        }
        else{
          gender = "female";
        }
        
        this.addForm.patchValue({
          name: data[0].name,
          rollNo: data[0].rollNo,
          age: data[0].age,
          date: data[0].date,
          email: data[0].email,
          gender: gender
        });
      },
      (err) => console.log('HTTP Error', err)
      );
    }

    updateStudent():void{
    
      let isMale:boolean = true;
  
      if(this.addForm.get('gender').value == 'female'){
        isMale = false;
      }
  
      let student:Student = new Student(
        this.id, 
        this.addForm.get('name').value, 
        this.addForm.get('rollNo').value, 
        this.addForm.get('age').value, 
        this.addForm.get('date').value, 
        this.addForm.get('email').value, 
        isMale);
      this.studentService.updateStudent(student).subscribe((data)=>{
        this.addForm.reset();
        this.getStudents();
        alert("Student updated");
      },
      (err) => console.log('HTTP Error', err)
      );
    }

    deleteStudent(id:string):void{
      if(confirm("Are you sure to delete?")) {
        this.studentService.deleteStudent(id).subscribe((data)=>{
          this.getStudents();
          alert("Student deleted");
        },
        (err) => console.log('HTTP Error', err)
        );
      }
    }
}
