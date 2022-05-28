import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-topnav",
  templateUrl: "./topnav.component.html",
  styleUrls: ["./topnav.component.css"],
})
export class TopnavComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  Logout() {
    window.location.reload();
    localStorage.removeItem("token");
    localStorage.removeItem("ID");
    localStorage.removeItem("adminData");
    this.router.navigate(["/"]).then(() => {
      window.location.reload();
    });
  }
}
