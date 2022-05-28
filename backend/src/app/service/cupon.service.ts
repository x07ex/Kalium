import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { global } from "./global";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: "root",
})
export class CuponService {
  public url;

  constructor(private HTTP: HttpClient) {
    this.url = global.url;
  }

  updateCupon(id: any, cupon: any, token: any): Observable<any> {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: token,
    });
    return this.HTTP.put(this.url + "updateCupon/" + id, cupon, {
      headers: headers,
    });
  }

  getCupon(id: any, token: any): Observable<any> {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: token,
    });
    return this.HTTP.get(this.url + "getCupon/" + id, { headers: headers });
  }

  registerCupon(data: any, token: any): Observable<any> {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: token,
    });
    return this.HTTP.post(this.url + "registerCupon", data, {
      headers: headers,
    });
  }

  deleteCupon(id: any, token: any): Observable<any> {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: token,
    });
    return this.HTTP.delete(this.url + "deleteCupon/" + id, {
      headers: headers,
    });
  }

  listCupones(filtro: string, token: any): Observable<any> {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: token,
    });
    return this.HTTP.get(this.url + "listCupones/" + filtro, {
      headers: headers,
    });
  }
}
