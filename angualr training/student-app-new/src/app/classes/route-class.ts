import { Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { ListComponent } from '../components/list/list.component';
import { AddComponent } from "../components/add/add.component";
import { UpdateComponent } from "../components/update/update.component";
import { DeleteComponent } from "../components/delete/delete.component";
import { ErrorComponent } from "../components/error/error.component";
import { LoginComponent } from "../components/login/login.component";
import { LogoutComponent } from "../components/logout/logout.component";
import { RouteGuard } from '../services/router-guard';

export class RoutesClass {
    public static routes : Routes = [
        {path:"home", component:HomeComponent},
        {path:"list", component:ListComponent},
        {path:"add", component:AddComponent,
        canActivate: [RouteGuard]},
        {path:"update/:id", component:UpdateComponent,
        canActivate: [RouteGuard]},
        {path:"delete/:id", component:DeleteComponent,
        canActivate: [RouteGuard]},
        {path:"login", component:LoginComponent},
        {path:"logout", component:LogoutComponent},
        {path:"", redirectTo:"/home", pathMatch:"full"},
        { path: '**', component: ErrorComponent}
      ];
}
