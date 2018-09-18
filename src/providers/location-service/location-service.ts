import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppServiceProvider } from '../app-service/app-service';


@Injectable()
export class LocationServiceProvider {

  constructor(public http: HttpClient, public app: AppServiceProvider) {
    console.log('Hello LocationServiceProvider Provider');
  }



  storeLocation(payload: any): Observable<any> {

    let url = this.app.getUrl() + '/buses/' + payload.busno + '/store';
    console.log(url);
    // let headers = new Headers({ 'Content-Type': 'application/json' });
    // let options = new RequestOptions({ headers: headers });
    return this.http.post(url, payload);
  }


  getLocation(busno: number) {
    let url = this.app.getUrl() + '/buses/' + busno + '/location';
    return this.http.get(url);
  }
}
