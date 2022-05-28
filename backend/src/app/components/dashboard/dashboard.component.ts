import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  public admin: any;

  constructor() {}

  ngOnInit(): void {
    const data = localStorage.getItem("adminData");
    const json = JSON.parse(`${data}`);
    this.admin = json.name;
  }
}
