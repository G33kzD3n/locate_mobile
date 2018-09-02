import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { RequestOptions, Headers, Http } from '@angular/http';
import { AppServiceProvider } from '../../providers/app-service/app-service';
import "rxjs/add/operator/map";
import { TabsPage } from '../tabs/tabs'
import { LoginPage } from '../login/login'

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  public rootpage: any = TabsPage;
  @ViewChild(Nav) nav: Nav;
  public user1: any;

  constructor(public navCtrl: NavController, public storage: Storage, public app: AppServiceProvider, public http: Http, public navParams: NavParams) {



  }


  ionViewDidEnter() {

    let userToken: any;
    this.user1 = this.navParams.get('user');
    console.log(this.user1);
    // this.user1= this.navParams.get('user');
    this.storage.get('token').then((token) => {
      userToken = this.app.getToken(token);
      //console.log(userToken);
    });
    console.log(this.navParams.get('token'));
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', 'Bearer ' + this.navParams.get('token'));
    let url = this.app.getUrl() + '/users/' + this.user1;
    console.log(url);
    this.http.get(url, { headers: headers })
      .map(res => res.json())
      .subscribe(
        result => {
          let user = result;
          console.log(user);
        },
        error => {
          console.log(error);
        },
        () => {
          this.app.showToast('profile', 'top');
          // this.navCtrl.setRoot(MenuPage);
        });

  }

}
