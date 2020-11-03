import { Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { ListComponent } from '../components/list/list.component';
import { AddComponent } from "../components/add/add.component";
import { UpdateComponent } from "../components/update/update.component";
import { DeleteComponent } from "../components/delete/delete.component";
import { ErrorComponent } from "../components/error/error.component";


export class RoutesClass {
    public static routes : Routes = [
        {path:"home", component:HomeComponent},
        {path:"list", component:ListComponent},
        {path:"add", component:AddComponent},
        {path:"update/:id", component:UpdateComponent},
        {path:"delete/:id", component:DeleteComponent},
        {path:"", redirectTo:"/home", pathMatch:"full"},
        { path: '**', component: ErrorComponent}
      ];
}
