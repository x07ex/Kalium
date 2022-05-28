import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AdminService } from "./service/admin.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "backend";

  constructor(private adminService: AdminService, private router: Router) {}

  ngOnInit(): void {
    if (localStorage.getItem("token") != null) {
      this.adminService.verifyToken(localStorage.getItem("token")).subscribe(
        (response: any) => {},
        (error: any) => {
          localStorage.removeItem("token");
          localStorage.removeItem("ID");
          localStorage.removeItem("adminData");
          this.router.navigate(["/login"]);
        }
      );
    }
  }
}
