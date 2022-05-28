import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { global } from "./global";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: "root",
})
export class AdminService {
  public url;

  constructor(private HTTP: HttpClient) {
    this.url = global.url;
  }

  registerUser(user: any, token: any): Observable<any> {
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.HTTP.post(this.url + "registerUser", user, {
      headers: headers,
    });
  }

  loginAdmin(data: any): Observable<any> {
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.HTTP.post(this.url + "loginAdmin", data, { headers: headers });
  }

  isAuth() {
    const token: any = localStorage.getItem("token");
    try {
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(token);
      if (!token) {
        localStorage.clear();
        return false;
      }
      if (!decodedToken) {
        localStorage.clear();
        return false;
      }
      if (helper.isTokenExpired(token)) {
        localStorage.clear();
        return false;
      }
    } catch (error) {
      console.error(error);
      localStorage.clear();
      return false;
    }
    return true;
  }

  verifyToken(token: any): Observable<any> {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: token,
    });
    return this.HTTP.get(this.url + "verifyToken", { headers: headers });
  }

  listUsers(token: any): Observable<any> {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: token,
    });
    return this.HTTP.get(this.url + "listUsers", { headers: headers });
  }

  listAdmins(token: any): Observable<any> {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: token,
    });
    return this.HTTP.get(this.url + "listAdmins", { headers: headers });
  }

  deleteUser(id: any, token: any): Observable<any> {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: token,
    });
    return this.HTTP.delete(this.url + "deleteUser/" + id, {
      headers: headers,
    });
  }

  updateUser(id: any, data: any, token: any): Observable<any> {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: token,
    });
    return this.HTTP.put(this.url + "updateUser/" + id, data, {
      headers: headers,
    });
  }
  getUser(id: any, token: any): Observable<any> {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: token,
    });
    return this.HTTP.get(this.url + "getUser/" + id, { headers: headers });
  }
}
