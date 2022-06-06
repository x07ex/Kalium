import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { NgbPaginationModule } from "@ng-bootstrap/ng-bootstrap";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { routing } from "./app.routing";
import { CreateCuponesComponent } from "./components/cupones/create-cupones/create-cupones.component";
import { CuponesComponent } from "./components/cupones/cupones.component";
import { EditCuponesComponent } from "./components/cupones/edit-cupones/edit-cupones.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { LoginComponent } from "./components/login/login.component";
import { SettingsComponent } from "./components/settings/settings.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { TopnavComponent } from "./components/topnav/topnav.component";
import { CreateUsersComponent } from "./components/users/create-users/create-users.component";
import { EditUsersComponent } from "./components/users/edit-users/edit-users.component";
import { UsersComponent } from "./components/users/users.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SidebarComponent,
    TopnavComponent,
    DashboardComponent,
    UsersComponent,
    EditUsersComponent,
    SettingsComponent,
    CuponesComponent,
    CreateCuponesComponent,
    EditCuponesComponent,
    CreateUsersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    routing,
    FormsModule,
    HttpClientModule,
    NgbPaginationModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
