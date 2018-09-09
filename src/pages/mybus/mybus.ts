import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AppServiceProvider } from '../../providers/app-service/app-service';
import { RequestOptions, Headers, Http } from '@angular/http';


@IonicPage()
@Component({
  selector: 'page-mybus',
  templateUrl: 'mybus.html',
})
export class MybusPage {
  public bus: any;

  constructor(public http: Http, public app: AppServiceProvider, public storage: Storage, public navCtrl: NavController, public navParams: NavParams) {
    this.bus = "";
  }

  ionViewDidLoad() {
    this.gotomybus();
  }

  gotomybus() {
    this.storage.get('bus_no').then((bus_no) => {
      bus_no = this.app.getToken(bus_no);

      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });

      this.http.get(this.app.getUrl() + '/buses/' + bus_no, options)
        .map(res => res.json())
        .subscribe(

          result => {
            this.bus = result.bus;
            console.log(this.bus);
          },
          error => {
            error = (JSON.parse(error._body));
            if (error) {
              this.app.showToast('error.error.error_message', 'top');
            }
          },
          () => {

          });
    });
  }
}
