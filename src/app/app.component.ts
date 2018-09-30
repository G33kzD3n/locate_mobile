import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AppServiceProvider } from '../providers/app-service/app-service';
import { LoginPage } from '../pages/login/login';
import { ModalPage } from '../pages/modal/modal';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;
  //rootPage :any =  TabsPage;
  rootPage: any = LoginPage;


  constructor(public modal:ModalController,public app: AppServiceProvider, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  openmodal()
  {
    let notice= this.modal.create(ModalPage)
    notice.present();
  }
}



