import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AppServiceProvider } from '../../providers/app-service/app-service';
import { RequestOptions, Headers, Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Network } from '@ionic-native/network';
import { PusherServiceProvider } from '../../providers/pusher-service/pusher-service';

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
  user:any;


  constructor(public pusher:PusherServiceProvider ,public network: Network, public navCtrl: NavController, private app: AppServiceProvider, public http: Http, public storage: Storage) {
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
  register() {
    this.navCtrl.push(SignupPage);
  }

  gotoprofile() {
    if (this.app.internetstatus == false) {
      console.log(this.app.internetstatus);
      this.app.Confirm();
    }
    else {
    
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

            this.user = result.data;
            this.storage.set('bus_no', this.user.bus_no);
            this.storage.set('level', this.user.level);
            this.storage.set('token', this.user.token);
            this.storage.set('name', this.user.name);
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
            this.pusher.breakdown = this.pusher.init(this.user.bus_no + '-channel');
            this.navCtrl.setRoot(MenuPage, {
              user: this.loginForm.controls['username'].value
            });
          });
    }
  }

  ionViewDidEnter() {
    this.storage.get('token').then((token) => {
      if (token) {
        this.navCtrl.setRoot(MenuPage);
      }
    });
  }
}
