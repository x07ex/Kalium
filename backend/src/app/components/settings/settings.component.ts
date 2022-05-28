import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AdminService } from "src/app/service/admin.service";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.css"],
})
export class SettingsComponent implements OnInit {
  public users: Array<any> = [];
  public lengthUsers: any;
  public admins: Array<any> = [];
  public lengthAdmins: any;
  public date: any;
  public token = localStorage.getItem("token");

  constructor(private adminService: AdminService, private router: Router) {}

  ngOnInit(): void {
    this.adminService.listUsers(this.token).subscribe((response) => {
      const data = response.data;
      this.users = data;
      this.lengthUsers = this.users.length;
    });

    this.adminService.listAdmins(this.token).subscribe((response) => {
      const data = response.data;
      this.admins = data;
      this.lengthAdmins = this.admins.length;
    });

    setInterval(() => {
      const date = new Date();
      const hour = date.getHours();
      const minute = date.getMinutes();
      const seconds = date.getSeconds();
      const year = date.getFullYear();
      this.date = `${hour}:${minute}:${seconds} | ${year}`;
    }, 1000);
  }
}
