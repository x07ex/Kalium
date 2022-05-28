import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AdminService } from "src/app/service/admin.service";

declare const iziToast: any;

@Component({
  selector: "app-edit-users",
  templateUrl: "./edit-users.component.html",
  styleUrls: ["./edit-users.component.css"],
})
export class EditUsersComponent implements OnInit {
  public user: any = {};
  public id: any;
  public token: any;
  public loadBTN = false;
  public loadData = true;

  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService,
    private router: Router
  ) {
    this.token = localStorage.getItem("token");
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params["id"];

      this.adminService.getUser(this.id, this.token).subscribe(
        (response) => {
          if (response.data == undefined) {
            this.user = undefined;
            this.loadData = false;
          } else {
            this.user = response.data;
            this.loadData = false;
          }
        },
        () => {
          // ...
        }
      );
    });
  }

  update(updateForm: any) {
    if (updateForm.valid) {
      this.loadBTN = true;
      this.adminService.updateUser(this.id, this.user, this.token).subscribe(
        (_) => {
          iziToast.show({
            theme: "dark",
            title: "GOOD",
            position: "topCenter",
            message: "Se actualizo el usuario exitosamente",
            progressBarColor: "green",
          });

          this.loadBTN = false;
          this.router.navigate(["/users"]);
        },
        () => {}
      );
    } else {
      iziToast.show({
        theme: "dark",
        title: "Error",
        position: "topCenter",
        message: "Los datos del formulario no son validos",
        progressBarColor: "red",
      });
    }
  }
}
