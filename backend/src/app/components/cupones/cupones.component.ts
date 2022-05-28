import { Component, OnInit } from "@angular/core";
import { CuponService } from "src/app/service/cupon.service";

declare const iziToast: any;
declare const jQuery: any;
declare const $: any;

@Component({
  selector: "app-cupones",
  templateUrl: "./cupones.component.html",
  styleUrls: ["./cupones.component.css"],
})
export class CuponesComponent implements OnInit {
  public cupones: Array<any> = [];
  public loadData = true;
  public page = 1;
  public pageSize = 20;
  public filtro = "";
  public token;

  constructor(private cuponService: CuponService) {
    this.token = localStorage.getItem("token");
  }

  ngOnInit(): void {
    this.cuponService
      .listCupones(this.filtro, this.token)
      .subscribe((response: any) => {
        this.cupones = response.data;
        this.loadData = false;
      });
  }

  filter() {
    this.cuponService
      .listCupones(this.filtro, this.token)
      .subscribe((response: any) => {
        this.cupones = response.data;
        this.loadData = false;
      });
  }

  delete(id: any) {
    this.cuponService.deleteCupon(id, this.token).subscribe(
      (_) => {
        iziToast.show({
          theme: "dark",
          title: "GOOD",
          position: "topCenter",
          message: "Se elimino exitosamente el cupon",
          progressBarColor: "green",
        });

        $("#delete-" + id).modal("hide");
        $(".modal-backdrop").removeClass("show");

        this.cuponService
          .listCupones(this.filtro, this.token)
          .subscribe((response) => {
            this.cupones = response.data;
            this.loadData = false;
          });
      },
      () => {
        //
      }
    );
  }
}
