import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav, Platform} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { RequestOptions, Headers, Http } from '@angular/http';
import { AppServiceProvider } from '../../providers/app-service/app-service';

import { TabsPage } from '../tabs/tabs'
import { LoginPage } from '../login/login'

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  public rootpage:any = TabsPage;
  @ViewChild(Nav) nav: Nav;
  public user1:any;
  
  constructor(public navCtrl: NavController,public storage: Storage,public app:AppServiceProvider,public http:Http, public navParams: NavParams) {
  

    
  }

 
ionViewDidEnter()
  {
    let user;
    let userToken:any;
    this.user1= this.navParams.get('user');
    console.log(this.user1);   
    // this.user1= this.navParams.get('user');
     this.storage.get('token').then((token)=>{
     userToken = this.app.getToken(token);
     console.log(userToken);
     });
    // console.log(user);
    let headers = new Headers({'Content-Type':  'application/json'});
    headers.append('Authorization', 'Bearer' + userToken);
    let options = new RequestOptions({ headers: headers });
    this.http.get(this.app.getUrl() + '/users/' + this.user1, options)
          .map(res => res.json())
          .subscribe(
  
            result => {
              user=result; 
              //console.log(user);
              //  console.log(user[0]);        

            },
            error => {
               //user=(JSON.parse(error._body));

            },
            () => {
            this.app.showToast('profile', 'top');
           // this.navCtrl.setRoot(MenuPage);
          });
  
  }

}
