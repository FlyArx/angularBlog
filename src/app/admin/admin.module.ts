import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import { LoginComponent } from './login/login.component';
import { EditComponent } from './edit/edit.component';
import { CreateComponent } from './create/create.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminLayoutComponent } from './shared/admin-layout/admin-layout.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "../shared/auth.service";
import {SharedModule} from "../shared/shared/shared.module";
import {authGuard} from "../shared/auth.guard";
import {NgxSkeletonLoaderModule} from "ngx-skeleton-loader";
import { SearchPostsPipe } from './shared/search-posts.pipe';
import { AlertsComponent } from './shared/alerts/alerts.component';
import {AlertService} from "./shared/services/alert.service";



@NgModule({
  declarations: [
    LoginComponent,
    EditComponent,
    CreateComponent,
    DashboardComponent,
    AdminLayoutComponent,
    SearchPostsPipe,
    AlertsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: AdminLayoutComponent, children: [
          {path: '', redirectTo: '/admin/login', pathMatch: "full"},
          {path: 'login', component: LoginComponent},
          {path: 'dashboard', component: DashboardComponent, canActivate: [authGuard]},
          {path: 'create', component: CreateComponent, canActivate: [authGuard]},
          {path: 'post/:id/edit', component: EditComponent, canActivate: [authGuard]},
        ]}
    ]),
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgxSkeletonLoaderModule
  ],
  providers: [AlertService],
  exports: [RouterModule]
})
export class AdminModule { }
