import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";

import { LoginComponent } from "./components/login/login.component";
import { AuthGuard } from "./guards/auth.guard";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { UsersComponent } from "./components/users/users.component";
import { SettingsComponent } from "./components/settings/settings.component";
import { EditUsersComponent } from "./components/users/edit-users/edit-users.component";
import { CuponesComponent } from "./components/cupones/cupones.component";
import { CreateCuponesComponent } from "./components/cupones/create-cupones/create-cupones.component";
import { EditCuponesComponent } from "./components/cupones/edit-cupones/edit-cupones.component";
import { CreateUsersComponent } from "./components/users/create-users/create-users.component";

const APPRoute: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },

  {
    path: "home",
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "settings",
    component: SettingsComponent,
    canActivate: [AuthGuard],
  },

  {
    path: "users",
    component: UsersComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "users/:id",
    component: EditUsersComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "users/register",
    component: CreateUsersComponent,
    canActivate: [AuthGuard],
  },

  {
    path: "cupones",
    component: CuponesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "cupones/register",
    component: CreateCuponesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "cupones/:id",
    component: EditCuponesComponent,
    canActivate: [AuthGuard],
  },

  { path: "login", component: LoginComponent },
  { path: "**", redirectTo: "login" },
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(APPRoute);
