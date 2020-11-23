import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  modalRef:any;
  addForm:FormGroup;
  rollNo:FormControl;
  name:FormControl;
  age:FormControl;
  date:FormControl;
  email:FormControl;
  gender:FormControl;

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
    this.createFormControls();
    this.createForm();
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
      this.modalRef.close();
      this.addStudent();
    }
  }

  addStudent():void{
      alert("student added");
    }

    dobChange():void{
      let dobDate:Date = new Date(this.date.value);
      let diff = (new Date().getTime() - dobDate.getTime());
      let ageTotal = Math.trunc(diff/ (1000 * 3600 * 24 *365));
      this.addForm.patchValue({
        age: ageTotal,
      });
    }

    open(content) {
      this.modalRef = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
      this.modalRef.result.then((result) => {
        alert("closed");
      }, (reason) => {
        alert("dismissed");
      });
    }
}
