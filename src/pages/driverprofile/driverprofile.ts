import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { RequestOptions, Headers, Http } from '@angular/http';
import { AppServiceProvider } from '../../providers/app-service/app-service';

@IonicPage()
@Component({
  selector: 'page-driverprofile',
  templateUrl: 'driverprofile.html',
})
export class DriverprofilePage {
  public user1:any;
  public title= "Profile";

  constructor(public navCtrl: NavController, public storage: Storage, public app: AppServiceProvider, public http: Http, public navParams: NavParams) {

    this.user1 = "";
  }

  ionViewDidLoad() {
    this.storage.get('user').then((user) => {
      user = this.app.getToken(user);


      let headers = new Headers({ 'Content-Type': 'application/json' });
      // headers.append('Authorization', 'Bearer ' + userToken);
      let options = new RequestOptions({ headers: headers });

      this.http.get(this.app.getUrl() + '/users/' + user, options)
        .map(res => res.json())
        .subscribe(

          result => {
            this.user1 = result.data;
          },
          error => {
            error = (JSON.parse(error._body));
            if (error) {
              this.app.showToast('error.error.error_message', 'top');
              this.app.removeLoader();
              //user=(JSON.parse(error._body));
            }
          },
          () => {
            this.app.removeLoader();
          });
    });
  }

}
