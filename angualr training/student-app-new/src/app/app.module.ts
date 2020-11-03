import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import {  RouterModule } from '@angular/router';
import {  ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { StudentService } from "./services/student.service";
import { ListComponent } from './components/list/list.component';
import { HomeComponent } from './components/home/home.component';
import { RoutesClass } from "./classes/route-class";
import { AddComponent } from './components/add/add.component';
import { UpdateComponent } from './components/update/update.component';
import { DeleteComponent } from './components/delete/delete.component';
import { ErrorComponent } from './components/error/error.component';
import { ModalExampleComponent } from './modal-example/modal-example.component';


@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    HomeComponent,
    AddComponent,
    UpdateComponent,
    DeleteComponent,
    ErrorComponent,
    ModalExampleComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(RoutesClass.routes),
    ReactiveFormsModule
  ],
  providers: [StudentService],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
