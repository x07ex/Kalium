import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AdminService } from "src/app/service/admin.service";

declare const $: any;
declare const iziToast: any;

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  public token: any = "";
  public malo: any = false;

  public admin = {
    email: "",
    password: "",
  };

  constructor(private adminService: AdminService, private router: Router) {
    this.token = localStorage.getItem("token");
  }

  ngOnInit(): void {
    $("body").addClass("align-items-center");
    if (this.token) {
      this.router.navigate(["/home"]);
    } else {
      fetch("https://api.ipify.org/?format=json", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.statusCode == 429 || data.statusCode == 429) {
            return;
          } else {
            this.adminService.checkIP(data.ip).subscribe((response: any) => {
              if (response.reports >= 5 || response.abuseScore >= 10) {
                this.malo = true;
              } else {
                return; // ...
              }
            });
          }
        })
        .catch((_) => {
          return; // ...
        });
    }
  }

  Login(loginForm: any) {
    if (loginForm.valid) {
      const email = loginForm.value.email;
      const password = loginForm.value.password;

      if (email == "" || password == "") {
        iziToast.show({
          theme: "dark",
          title: "Error",
          position: "topCenter",
          message: `Parece que el campo de ${
            email == "" ? "email" : "contraseña"
          } esta vacio`,
          progressBarColor: "red",
        });
      } else {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          iziToast.show({
            theme: "dark",
            title: "Error",
            position: "topCenter",
            message: "El correo no es valido [exm: name@domain.com]",
            progressBarColor: "red",
          });
        } else {
          this.adminService.loginAdmin({ email, password }).subscribe(
            (response: any) => {
              if (response.data != null) {
                this.token = response.jwt;
                localStorage.setItem("token", response.token);
                localStorage.setItem("ID", response.data._id);
                localStorage.setItem(
                  "adminData",
                  JSON.stringify(response.data)
                );
                this.router.navigate(["/home"]);
              } else {
                iziToast.show({
                  theme: "dark",
                  title: "Error",
                  position: "topCenter",
                  message: response.message,
                  progressBarColor: "red",
                });
              }
            },
            (_) => {
              iziToast.show({
                theme: "dark",
                title: "Error",
                position: "topCenter",
                message: "Ocurrió un error en el servidor, pruebe mas tarde.",
                progressBarColor: "red",
              });
            }
          );
        }
      }
    } else {
      iziToast.show({
        theme: "dark",
        title: "Error",
        position: "topCenter",
        message: "Completa el formulario correctamente.",
        progressBarColor: "red",
      });
    }
  }

  viewPassword() {
    let type = $("#password").attr("type");
    if (type == "text") {
      $("#password").attr("type", "password");
    } else if (type == "password") {
      $("#password").attr("type", "text");
    }
  }
}
