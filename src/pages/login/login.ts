import { Component } from '@angular/core';
import { IonicPage, NavController, Option } from 'ionic-angular';
import { FormGroup, Validators, FormControl} from '@angular/forms';
import { AppServiceProvider } from '../../providers/app-service/app-service';
import { RequestOptions, Headers, Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import "rxjs/add/operator/map";


import { SignupPage } from '../signup/signup';
import { MenuPage } from '../menu/menu';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  
})

export class LoginPage {
  title = "LocaTe";
  loader:any;
  loginForm: FormGroup;
  //phone:number = 9796563123;
  //roll:number= 15045112007;
  

  constructor(public navCtrl: NavController, private app: AppServiceProvider, public http: Http,public storage: Storage) 
            {
             }

  ngOnInit(){
    this.loginForm = new FormGroup({

        'username' : new FormControl('', Validators.compose([
                                      Validators.required,
                                      Validators.minLength(11),
                                      Validators.maxLength(11),
                                      Validators.pattern(/[0-9]*/)])),

        'password' : new FormControl('',  Validators.compose([
                                      Validators.required,
                                      //Validators.minLength(8),
                                      //Validators.maxLength(11)])),
                                      Validators.pattern(/^(19|20)\d\d([- /.])(0[1-9]|1[012])\2(0[1-9]|[12][0-9]|3[01])$/)])),
                              });
            }
gotopage()
  {
  	this.app.loader();
  	this.navCtrl.push(SignupPage);
}
gotoprofile(){  

        let user : any; 
        // let roll = 
        
        let payload ={
          username : this.loginForm.controls['username'].value,
          password : this.loginForm.controls['password'].value
        };

         let headers = new Headers({'Content-Type':  'application/json'});
         let options = new RequestOptions({ headers: headers });

         //this.http.get("http://localhost:8000/api/user")
        this.http.post('http://192.168.43.58:9000/api/1.0/login',payload, options)
          .map(res => res.json())
          .subscribe(
  
            result => {

              user=result.data;
              console.log(user);
              this.storage.set('bus_no',user.bus_no);
              this.storage.set('level', user.level);
              this.storage.set('token', user.token);           
            },
            error => {
             // console.log(JSON.parse(error._body));
              user=(JSON.parse(error._body));
              //console.log(user.errors.error_message);
               this.app.showToast(user.errors.error_title +  user.errors.error_message, 'top');
            },
            
            () => {
            //this.app.showToast('logged in', 'top');
            this.navCtrl.setRoot(MenuPage, {
              user: this.loginForm.controls['username'].value});
            
          });

   }
}
