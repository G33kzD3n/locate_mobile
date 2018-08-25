import { Component } from '@angular/core';
import { IonicPage, NavController, Option } from 'ionic-angular';
import { FormGroup, Validators, FormControl} from '@angular/forms';
import { AppServiceProvider } from '../../providers/app-service/app-service';
import { RequestOptions, Headers, Http } from '@angular/http';
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
  

  constructor(public navCtrl: NavController, private app: AppServiceProvider, public http: Http) 
            {
             }

  ngOnInit(){
    this.loginForm = new FormGroup({

        'phone' : new FormControl('', Validators.compose([
                                      Validators.required,
                                      Validators.minLength(10),
                                      Validators.maxLength(10),
                                      Validators.pattern(/[0-9]*/)])),

        'roll' : new FormControl('',  Validators.compose([
                                      Validators.required,
                                      Validators.minLength(8),
                                      Validators.maxLength(11)])),
                              });
            }
gotopage()
  {
  	this.app.loader();
  	this.navCtrl.push(SignupPage);
}
gotoprofile(){  

        // let phone = 
        // let roll = 

        let payload ={
          phone : this.loginForm.controls['phone'].value,
          roll : this.loginForm.controls['roll'].value
        };

         let headers = new Headers({'Content-Type':  'application/json'});
         let options = new RequestOptions({ headers: headers });

        // this.http.get("http://localhost:8000/api/user")
        this.http.post('http://localhost:8000/api/login',payload, options)
          .map(res => res.json())
          .subscribe(
  
            result => {
              console.log(result.data);
              this.navCtrl.setRoot(MenuPage);
            },
            error => {
              console.log(error);
              this.app.showToast('error', 'top');

            },
            
            () => { console.log("loggedin");
            this.app.showToast('logged in', 'top');
          });

   }

      // {
         
     //      this.app.loader();
     //   this.navCtrl.setRoot(MenuPage);
     // //   }
      //  else{
      //   this.app.showToast('Enter Valid Details', 'top');
      // }


}
