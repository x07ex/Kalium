import { Component, OnInit } from "@angular/core";
import { AdminService } from "src/app/service/admin.service";

declare const Jquery: any;
declare const $: any;
declare const iziToast: any;

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"],
})
export class UsersComponent implements OnInit {
  public Loaddata = true;
  public users: Array<any> = [];
  public usersConst: Array<any> = [];
  public token = localStorage.getItem("token");
  public page = 1;
  public pageSize = 10;
  public filtro = "";

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.init();
  }

  init() {
    this.adminService.listUsers(this.token).subscribe((response) => {
      this.usersConst = response.data;
      this.users = this.usersConst;
      this.Loaddata = false;
    });
  }

  filterUsers() {
    this.Loaddata = true;
    if (this.filtro) {
      var term = new RegExp(this.filtro.toString().trim(), "i");
      this.users = this.usersConst.filter(
        (item) =>
          term.test(item.name) ||
          term.test(item.lastnames) ||
          term.test(item.mail) ||
          term.test(item.phone) ||
          term.test(item._id)
      );
    } else {
      this.users = this.usersConst;
    }
  }

  deleteUser(id: any) {
    this.adminService.deleteUser(id, this.token).subscribe(
      (_) => {
        iziToast.show({
          theme: "dark",
          title: "GOOD",
          position: "topCenter",
          message: "Perfecto, se elimino exitosamente el usuario",
          progressBarColor: "green",
        });

        $("#deleteUser-" + id).modal("hide");
        $(".modal-backdrop").removeClass("show");
        this.init();
      },
      (_) => {
        iziToast.show({
          theme: "dark",
          title: "Error",
          position: "topCenter",
          message: "Upss... Parece que sucedio un error inesperado",
          progressBarColor: "red",
        });
      }
    );
  }
}
