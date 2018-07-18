import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LinkPage } from '../link/link';
import { SurveyPage } from '../survey/survey';

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
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.screen = navParams.get('data');
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad CongratulatePage');
  }

  transferAssets(){
    this.navCtrl.setRoot(LinkPage);
  }

  openSurvey() {
    this.navCtrl.setRoot(SurveyPage)
  }

}
