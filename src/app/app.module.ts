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
import { LivelocationPage } from '../pages/livelocation/livelocation';
import { PassengersPage } from '../pages/passengers/passengers';
import { DriverprofilePage } from '../pages/driverprofile/driverprofile';
import { LocationPage } from '../pages/location/location';
import { RoutePage } from '../pages/route/route';
import { SignupPage } from '../pages/signup/signup';
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
import { Network } from '@ionic-native/network';
import { DatePipe } from '@angular/common';
import { LocationServiceProvider } from '../providers/location-service/location-service';
import { CallNumber } from '@ionic-native/call-number';
import { PusherServiceProvider } from '../providers/pusher-service/pusher-service';
import { ModalPage } from '../pages/modal/modal';
import { OpenNativeSettings } from '@ionic-native/open-native-settings'
import { Badge } from '@ionic-native/badge'
import { Geofence } from '@ionic-native/geofence';
import { DrawerPage } from '../pages/drawer/drawer';

import { BreakdowncordPage } from '../pages/breakdowncord/breakdowncord';
import { NotificationServiceProvider } from '../providers/notification-service/notification-service';


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
    PassengersPage,
    DriverprofilePage,
    BreakdownPage,
    DriverhomepagePage,
    ModalPage,
    LivelocationPage,
    DrawerPage,    
    BreakdowncordPage
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
    LivelocationPage,
    SignupPage,
    StudentPage,
    LocationPage,
    RoutePage,
    MenuPage,
    ProfilePage,
    CalenderPage,
    MybusPage,
    PassengersPage,
    DriverprofilePage,
    BreakdownPage,
    DriverhomepagePage,
    ModalPage,
    DrawerPage,
    BreakdowncordPage
  ],
  providers: [
    Geolocation,
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthServiceProvider,
    AppServiceProvider,
    Geolocation,
    Network,
    DatePipe,
    SplashScreen,
    LocationServiceProvider,
    CallNumber,
    PusherServiceProvider,
    OpenNativeSettings,
    Badge,
    Geofence,
    NotificationServiceProvider
  ]
})
export class AppModule { }
