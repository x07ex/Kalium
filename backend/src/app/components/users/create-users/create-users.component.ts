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
    name: "",
    lastnames: "",
    mail: "",
    password: "",
    username: "",
    phone: "",
  };

  public token: any;
  public LoadBTN = false;

  constructor(private adminService: AdminService, private router: Router) {
    this.token = localStorage.getItem("token");
  }

  ngOnInit(): void {}

  register(registerForm: any) {
    if (registerForm.valid) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.user.mail)) {
        iziToast.show({
          theme: "dark",
          title: "Error",
          position: "topCenter",
          message: "El correo no es valido [exm: name@domain.com]",
          progressBarColor: "red",
        });
      } else {
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
            iziToast.show({
              theme: "dark",
              title: "Error",
              position: "topCenter",
              message: "No se pudo registrar. > Mira consola",
              progressBarColor: "red",
            });
          }
        );
      }
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
