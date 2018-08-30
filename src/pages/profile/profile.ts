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
  title:string= "Profile";
  
  
  constructor(public navCtrl: NavController,public storage: Storage,public app:AppServiceProvider,public http:Http, public navParams: NavParams) {
  
    this.user1="";
    
  }

 
ionViewDidEnter()
  {
    let user;
    let userToken:any;
    
    //  this.storage.get('token').then((token)=>{
    //  userToken = this.app.getToken(token);
    this.storage.get('user').then((user)=>{
    user = this.app.getToken(user);
    
  
    let headers = new Headers({'Content-Type': 'application/json'});
    // headers.append('Authorization', 'Bearer ' + userToken);
    let options = new RequestOptions({ headers: headers });
    //console.log(user);
    // console.log(userToken);
    this.http.get(this.app.getUrl() + '/users/' + user, options)
      .map(res => res.json())
      .subscribe(
          
      result => {
        this.user1=result.data; 
      },
      error => {
        error=(JSON.parse(error._body));
        if(error){
          this.app.showToast('error.error.error_message','top');
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
