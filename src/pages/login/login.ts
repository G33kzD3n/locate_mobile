import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { FormGroup, Validators, FormControl} from '@angular/forms';
import { AppServiceProvider } from '../../providers/app-service/app-service';

import { SignupPage } from '../signup/signup';
import { MenuPage } from '../menu/menu';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {
  loader:any;
  loginForm: FormGroup;
  phone:number = 9796563123;
  roll:number= 15045112007;
  

  constructor(public navCtrl: NavController, private app: AppServiceProvider) 
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
gotoprofile()
  {  
       // if (this.loginForm.controls['phone'].value == this.phone &&
        //this.loginForm.controls['roll'].value == this.roll)
        //{
         
          this.app.loader();
          this.navCtrl.setRoot(MenuPage);
       // }
       // else{
        //  this.app.showToast('Enter Valid Details', 'top');
        //}
}
}
