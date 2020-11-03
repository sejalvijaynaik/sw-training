import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from '../../services/student.service';
import { Student } from '../../classes/student';

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  students:Student[] = [];
  
  constructor(private studentService:StudentService, private router:Router) { 
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

  updateStudent(id:string):void{
    this.router.navigate(['/update', id]);
  }
  deleteStudent(id:string):void{
    if(confirm("Are you sure to delete?")) {
      this.router.navigate(['/delete', id]);
    }
  }
}