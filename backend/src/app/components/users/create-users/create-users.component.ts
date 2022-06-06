import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AdminService } from "src/app/service/admin.service";

declare const iziToast: any;

@Component({
  selector: "app-create-users",
  templateUrl: "./create-users.component.html",
  styleUrls: ["./create-users.component.css"],
})
export class CreateUsersComponent implements OnInit {
  public user: any = {
    genero: "",
  };
  public token: any;
  public LoadBTN = false;

  constructor(private adminService: AdminService, private router: Router) {
    this.token = localStorage.getItem("token");
  }

  ngOnInit(): void {}

  register(registerForm: any) {
    if (registerForm.valid) {
      this.LoadBTN = true;
      this.adminService.registerUser(this.user, this.token).subscribe(
        (_) => {
          iziToast.show({
            theme: "dark",
            title: "GOOD",
            position: "topCenter",
            message: "Se registro el usuario exitosamente",
            progressBarColor: "green",
          });

          this.user = {
            name: "",
            lastnames: "",
            birthday: "",
            phone: "",
            email: "",
          };
          this.LoadBTN = false;
          this.router.navigate(["/users"]);
        },
        (_) => {
          // ...
        }
      );
    } else {
      iziToast.show({
        theme: "dark",
        title: "ERROR",
        position: "topCenter",
        message: "Los datos del formulario no son validos.",
        progressBarColor: "red",
      });
    }
  }
}
