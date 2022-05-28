import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CuponService } from "src/app/service/cupon.service";

declare const iziToast: any;

@Component({
  selector: "app-edit-cupones",
  templateUrl: "./edit-cupones.component.html",
  styleUrls: ["./edit-cupones.component.css"],
})
export class EditCuponesComponent implements OnInit {
  public token: any;
  public id: any;
  public cupon: any = {
    tipo: "",
  };
  public loadBTN = false;
  public loadData = true;

  constructor(
    private cuponService: CuponService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.token = localStorage.getItem("token");
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params["id"];

      this.cuponService.getCupon(this.id, this.token).subscribe((response) => {
        if (response.data == undefined) {
          this.cupon = undefined;
          this.loadData = false;
        } else {
          this.cupon = response.data;
          this.loadData = false;
        }
      });
    });
  }

  update(updateForm: any) {
    if (updateForm.valid) {
      this.loadBTN = true;
      this.cuponService
        .updateCupon(this.id, this.cupon, this.token)
        .subscribe((_) => {
          iziToast.show({
            theme: "dark",
            title: "GOOD",
            position: "topCenter",
            message: "Se actualizó correctamente el cupón.",
            progressBarColor: "green",
          });

          this.loadBTN = false;
          this.router.navigate(["/cupones"]);
        });
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
