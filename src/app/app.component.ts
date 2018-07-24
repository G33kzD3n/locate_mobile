import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';



//import { MenuPage } from '../pages/menu/menu';
//import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
//import { StudentPage } from '../pages/student/student';


@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  //rootPage :any =  TabsPage;
   rootPage:any =  LoginPage;
    //rootpage: any = MenuPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      //splashScreen.hide();
      splashScreen.show();

    });
  }
}

