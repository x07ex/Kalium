import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"],
})
export class SidebarComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}
  logout() {
    window.location.reload();
    localStorage.removeItem("token");
    localStorage.removeItem("ID");
    localStorage.removeItem("adminData");
    this.router.navigate(["/"]).then(() => {
      window.location.reload();
    });
  }
}
