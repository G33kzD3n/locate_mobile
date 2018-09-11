import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { FormsModule } from '@angular/forms';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { PassengersPage } from '../pages/passengers/passengers';
import { DriverprofilePage } from '../pages/driverprofile/driverprofile';
import { LocationPage } from '../pages/location/location';
import { RoutePage } from '../pages/route/route';
import { SignupPage } from '../pages/signup/signup';
import { NotificationPage } from '../pages/notification/notification';
import { StudentPage } from '../pages/student/student';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { MenuPage } from '../pages/menu/menu';
import { CalenderPage } from '../pages/calender/calender';
import { ProfilePage } from '../pages/profile/profile';
import { MybusPage } from '../pages/mybus/mybus';
import { AppServiceProvider } from '../providers/app-service/app-service';
import { IonicStorageModule } from '@ionic/storage';
import { BreakdownPage } from '../pages/breakdown/breakdown';
import { DriverhomepagePage } from '../pages/driverhomepage/driverhomepage';

import { Geolocation } from '@ionic-native/geolocation';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    SignupPage,
    StudentPage,
    LocationPage,
    RoutePage,
    MenuPage,
    ProfilePage,
    CalenderPage,
    MybusPage,
    NotificationPage,
    PassengersPage,
    DriverprofilePage,
    BreakdownPage,
    DriverhomepagePage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    SignupPage,
    StudentPage,
    LocationPage,
    RoutePage,
    MenuPage,
    ProfilePage,
    CalenderPage,
    MybusPage,
    NotificationPage,
    PassengersPage,
    DriverprofilePage,
    BreakdownPage,
    DriverhomepagePage
  ],
  providers: [
    Geolocation,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider,
    AppServiceProvider
  ]
})
export class AppModule {}
