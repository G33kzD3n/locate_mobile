import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppServiceProvider } from '../app-service/app-service';


@Injectable()
export class LocationServiceProvider {
  public id: any;
  constructor(public http: HttpClient, public app: AppServiceProvider) {

  }

  storeLocation(payload: any): Observable<any> {

    let url = this.app.getUrl() + '/buses/' + payload.busno + '/store';
    console.log(url);
    // let headers = new Headers({ 'Content-Type': 'application/json' });
    // let options = new RequestOptions({ headers: headers });
    return this.http.post(url, payload);
  }

  getLocation(busno: number): Observable<any> {
    let url = this.app.getUrl() + '/buses/' + busno + '/location';
    return this.http.get(url);
  }

  getProfile(user: number): Observable<any> {
    let url = this.app.getUrl() + '/users/' + user;
    return this.http.get(url);
  }
}
