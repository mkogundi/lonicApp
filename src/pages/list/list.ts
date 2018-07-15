import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-home',
  templateUrl: 'list.html'
})
export class ListPage {

  constructor(public navCtrl: NavController) {

  }

  openBot(){
    this.navCtrl.push(HomePage);
  }
}
