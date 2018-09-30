import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AppServiceProvider } from '../../providers/app-service/app-service';
import { RequestOptions, Headers, Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Network } from '@ionic-native/network';
import "rxjs/add/operator/map";

import { SignupPage } from '../signup/signup';
import { MenuPage } from '../menu/menu';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',

})

export class LoginPage {
  title = "LOCATE";
  loader: any;
  loginForm: FormGroup;


  constructor(public network: Network, public navCtrl: NavController, private app: AppServiceProvider, public http: Http, public storage: Storage) {

    this.network.onDisconnect().subscribe(() => {
      console.log('network was disconnected');
    });
    this.network.onConnect().subscribe(() => {
      console.log('network connected!');
    });
  }

  ngOnInit() {
    this.loginForm = new FormGroup({

      'username': new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(11),
        Validators.pattern(/[0-9]*/)])),

      'password': new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern(/^(19|20)\d\d([- /.])(0[1-9]|1[012])\2(0[1-9]|[12][0-9]|3[01])$/)])),
    });
  }
  gotopage() {
    this.navCtrl.push(SignupPage);
  }

  gotoprofile() {
    if (this.app.networkConn == true) {
      console.log("network connected");
    }
    else {
      console.log("network not connected");
    }
    let user: any;

    let payload = {
      username: this.loginForm.controls['username'].value,
      password: this.loginForm.controls['password'].value
    };

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    //this.http.get("http://localhost:8000/api/user")

    this.http.post(this.app.getUrl() + '/login', payload, options)
      .map(res => res.json())
      .subscribe(

        result => {

          user = result.data;
          this.storage.set('bus_no', user.bus_no);
          this.storage.set('level', user.level);
          this.storage.set('token', user.token);
          this.storage.set('name', user.name);
          this.storage.set('user', payload.username);


        },
        error => {
          error = (JSON.parse(error._body));
          if (error) {
            this.app.removeLoader();
            this.app.showToast("Username or Password doesn't match", 'top', 'error');
          }
        },

        () => {
          this.app.removeLoader();
          this.navCtrl.setRoot(MenuPage, {
            user: this.loginForm.controls['username'].value
          });
        });
  }

  ionViewDidEnter() {

    this.storage.get('token').then((token) => {
      if (token) {
        this.navCtrl.setRoot(MenuPage);
      }
    });
  }
}
