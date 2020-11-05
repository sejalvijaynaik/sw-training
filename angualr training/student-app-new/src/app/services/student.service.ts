import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, Observer, throwError } from 'rxjs';
import { Student } from "../classes/student";

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  students:Student[] = [];
  constructor(private httpClient:HttpClient){}
  baseUrl:string = "http://gsmktg.azurewebsites.net/api/v1/techlabs/test/students/";

  getStudents():Observable<Student[]>{
    

    return this.httpClient.get<Student[]>(this.baseUrl);

    /*return Observable.create((observer: Observer<Student>) => {
      this.httpClient.get(this.baseUrl).subscribe((data:any) => {
            observer.next(data)
        }, 
        (error) => {observer.error(error)})
    })*/
  }
  
  addStudent(student:Student):Observable<Student>{
    
    return Observable.create((observer: Observer<Student>) => {
      let studentJSON:string = JSON.stringify(student);
      let httpHeaders = new HttpHeaders({'Content-Type' : 'application/json'});
      this.httpClient.post<Student>(this.baseUrl, studentJSON, {'headers':httpHeaders}).subscribe((data:any) => {
            observer.next(data)
        }, 
        (error) => {observer.error(error)})
    })
  }

  getStudent(id:string):Observable<Student>{
    return Observable.create((observer: Observer<Student>) => {
      this.httpClient.get<Student>(this.baseUrl + id).subscribe((data:any) => {
            observer.next(data)
        }, 
        (error) => {observer.error(error)})
    })
  }

  updateStudent(student:Student):Observable<Student>{
    
    return Observable.create((observer: Observer<Student>) => {
      let studentJSON:string = JSON.stringify(student);
      let httpHeaders = new HttpHeaders({'Content-Type' : 'application/json'});
      this.httpClient.put<Student>(this.baseUrl + student.id, studentJSON, {'headers':httpHeaders}).subscribe((data:any) => {
            observer.next(data)
        }, 
        (error) => {observer.error(error)})
    })
  }
  deleteStudent(id:string){
    return this.httpClient.delete<Student>(this.baseUrl + id);
  }
}

