import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Nav, PopoverController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { RequestOptions, Headers, Http } from '@angular/http';
import { AppServiceProvider } from '../../providers/app-service/app-service';
import { LocationServiceProvider } from '../../providers/location-service/location-service';
import { ModalPage } from '../modal/modal';
import { NotificationServiceProvider } from '../../providers/notification-service/notification-service';
import * as pdfmake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { File } from '@ionic-native/file';
import { Platform } from 'ionic-angular';
import { FileOpener } from '@ionic-native/file-opener';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  @ViewChild(Nav) nav: Nav;
  public user1: any;
  public data: any;
  public stopid: any;
  title: string = "Profile";
  public roll: any;
  pdfObj = null;

  constructor(protected platform: Platform, protected notificationSrv: NotificationServiceProvider,
    protected fileopener: FileOpener,
    protected popoverCtrl: PopoverController, protected locationService: LocationServiceProvider,
    protected navCtrl: NavController, protected storage: Storage, protected app: AppServiceProvider,
    protected http: Http, protected navParams: NavParams, protected file: File) {

    this.user1 = "";
    this.data = "";
    this.roll = "";
  }


  ionViewDidEnter() {
    this.app.showLoader("Loading your Profile...");
    this.openuser();
    this.openfee();
  }
  openuser() {
    this.storage.get('user').then((user) => {
      user = this.app.getToken(user);
      this.roll = user;
      this.locationService.getProfile(user)
        .subscribe(
          result => {
            this.user1 = result.data;
            this.stopid = this.user1.stop.name;
          },
          error => {
            this.app.removeLoader();
            if (this.app.serverDown(error)) {
              this.app.showToast('Please try after sometime', 'top', 'error');
            } else {
              this.app.showToast("No data found in the database", 'top', 'error');
            }
          },
          () => {

          });
    });
  }
  openfee() {
    this.storage.get('user').then((user) => {
      user = this.app.getToken(user);
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      this.http.get(this.app.getUrl() + '/users/' + user + '/fees/unpaid', options)
        .map(res => res.json())
        .subscribe(

          result => {
            this.data = result.data;
          },
          error => {
            if (this.app.serverDown(error)) {
              this.app.showToast('Please try after sometime', 'top', 'error');
            } else {
              this.app.showToast("No data found in the database", 'top', 'error');
            }
          },
          () => {
            this.app.removeLoader();
          });
    });
  }
  presentPopover(ev) {
    let modal = this.popoverCtrl.create(ModalPage);
    modal.present({
      ev: ev
    });
  }
  makePdf() {
    if (!this.app.serverOffline) {
      this.app.showToast('Please try after sometime','top','error');
    }
    else {
      pdfmake.vfs = pdfFonts.pdfMake.vfs;
      var docDefinition = {
        content: [
          {
            columns: [
              // {
              //   image: 'data:image/jpeg;base64,your_image_here',
              //   fit: [100, 100]
              // },
              [
                { text: 'University of Kashmir', style: 'header' },
                { text: 'North Campus Delina, Baramulla', style: 'sub_header' },
                { text: '\n', style: '' },
                { text: 'Reciept No:', style: 'llr' },
                { text: 'Dated: ' + this.app.calDate(), style: 'url' },
                { text: '\n\n', style: '' },
                { text: 'Fee Reciept For Unpaid Fees', style: 'sub_header' },
                { text: '\n\n', style: '' },
                { text: 'Monthly fee: ' + this.data.monthly_fee, style: 'url' },
                { text: 'No of Unpaid Months: ' + this.data.unpaid_months, style: 'url' },
                { text: 'Total Amount Payable: ' + this.data.total_unpaid_fee, style: 'url' },
                { text: '\n\n', style: '' },
                { text: 'Payable by: ' + this.data.name, style: 'llr' },
                { text: 'Cashier Signature', style: 'url' },
              ]
            ]
          }
        ],
        styles: {
          header: {
            bold: true,
            fontSize: 30,
            alignment: 'center'
          },
          sub_header: {
            fontSize: 18,
            alignment: 'center'
          },
          url: {
            fontSize: 16,
            alignment: 'right'
          },
          llr: {
            fontSize: 16,
            alignment: 'left'
          }
        },
        pageSize: 'A5',
        pageOrientation: 'portrait'
      };
      this.pdfObj = pdfmake.createPdf(docDefinition);
      //   pdfmake.createPdf(docDefinition).getBuffer(function (buffer) {
      //     let utf8 = new Uint8Array(buffer);
      //     let binaryArray = utf8.buffer;
      //     self.saveToDevice(binaryArray, "Bitcoin.pdf")
      //   });
      // }

      if (this.platform.is('cordova')) {
        this.pdfObj.getBuffer((buffer) => {
          var blob = new Blob([buffer], { type: 'application/pdf' });
          // Save the PDF to the data Directory of our App
          this.file.writeFile(this.file.dataDirectory, 'myletter.pdf', blob, { replace: true }).then(fileEntry => {
            // Open the PDf with the correct OS tools
            this.fileopener.open(this.file.dataDirectory + 'myletter.pdf', 'application/pdf');
            this.saveToDevice(blob, 'myletter.pdf');
          })
        });
      } else {
        // On a browser simply use download!
        this.pdfObj.download();
      }
    }
  }





  saveToDevice(data: any, savefile: any) {
    this.file.writeFile(this.file.externalDataDirectory, savefile, data, { replace: false });
    this.app.showToast('File has been saved on device', 'top', 'success');
  }
}