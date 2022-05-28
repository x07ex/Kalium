import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CuponService } from "src/app/service/cupon.service";

declare const iziToast: any;

@Component({
  selector: "app-create-cupones",
  templateUrl: "./create-cupones.component.html",
  styleUrls: ["./create-cupones.component.css"],
})
export class CreateCuponesComponent implements OnInit {
  public token;

  public cupon: any = {
    tipo: "",
  };
  public loadBTN = false;

  constructor(private cuponServices: CuponService, private router: Router) {
    this.token = localStorage.getItem("token");
  }

  ngOnInit(): void {}

  registro(registroForm: any) {
    if (registroForm.valid) {
      this.loadBTN = true;
      this.cuponServices.registerCupon(this.cupon, this.token).subscribe(
        (_) => {
          iziToast.show({
            theme: "dark",
            title: "GOOD",
            position: "topCenter",
            message: "Se registro exitosamente el cupon",
            progressBarColor: "green",
          });

          this.loadBTN = false;
          this.router.navigate(["/cupones"]);
        },
        (error) => {
          console.log(error);
          this.loadBTN = false;
        }
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
