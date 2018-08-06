import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LinkPage } from '../link/link';
import { SurveyPage } from '../survey/survey';
import { InAppBrowser, InAppBrowserObject, InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { Portfolio } from '../portfolio/portfolio';
import { OrderEntryPage } from '../order-entry/order-entry';

/**
 * Generated class for the CongratulatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-congratulate',
  templateUrl: 'congratulate.html',
})
export class CongratulatePage {
  screen: string;
  accountNumber: string;
  constructor(public navCtrl: NavController, public navParams: NavParams,private iab: InAppBrowser) {
    this.screen = navParams.get('data');
    this.accountNumber = navParams.get('accountNumber');
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad CongratulatePage');
  }

  transferAssets(){
    this.navCtrl.push(LinkPage);
  }

  openSurvey(redirectTo) {
    this.navCtrl.setRoot(SurveyPage,{
        data:redirectTo
      });
  }

  openPortfolio(){
    this.navCtrl.push(Portfolio); 
  }

  openOrderEntry(){
    this.navCtrl.push(OrderEntryPage);
  }

}
