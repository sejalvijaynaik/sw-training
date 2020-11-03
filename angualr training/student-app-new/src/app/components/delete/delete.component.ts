import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  id:string = "";
  constructor(private studentService:StudentService, private router:Router, 
  private activatedRoute:ActivatedRoute) {}
  
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(()=>{this.id = this.activatedRoute.snapshot.paramMap.get("id");this.deleteStudent();})
  }

  deleteStudent():void{
    this.studentService.deleteStudent(this.id).subscribe((data)=>{
      this.router.navigate(["/list"]);
    },
    (err) => console.log('HTTP Error', err)
    );
  }
}
