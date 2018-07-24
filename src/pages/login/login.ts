import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Tabs} from 'ionic-angular';
import { FormGroup, Validators, FormControl} from '@angular/forms';

import { SignupPage } from '../signup/signup';
//import { StudentPage } from '../student/student';
import { LoadingController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { MenuPage } from '../menu/menu';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {

  loginForm: FormGroup;


                 users = 
                  [
                  {
                    id: 1,
                    username: "Nadeem",
                    password: "stranger"
                  },
                  {
                    id: 2,
                    username: "Sami",
                    password: "stranger"
                    
                  },
                  {
                    id: 3,
                    username: "Owais",
                    password: "stranger"
                  }
                  ];
  

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController) 
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
                                      Validators.maxLength(10)])),
                              });
            }
  
  gotopage()
  {
  	this.loader();
  	this.navCtrl.push(SignupPage);
    console.log("signupage");


  }


  gotoprofile()
  {  
     
        console.log("signupage");
//        if (this.loginForm.controls['phone'].value === this.phone)
          this.loader();
    this.navCtrl.setRoot(MenuPage);
   //this.navCtrl.push(TabsPage);
  

}


loader()
{
  let loading = this.loadingCtrl.create({
    content: 'Please wait...'
  });
  
  loading.present();

  setTimeout(() => {
    loading.dismiss();
  }, 50);


         
  }

}
