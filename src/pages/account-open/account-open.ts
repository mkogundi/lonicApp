import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Http, Response, RequestOptions,Headers} from '@angular/http';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { CongratulatePage } from '../congratulate/congratulate';

/**
 * Generated class for the AccountOpenPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-account-open',
  templateUrl: 'account-open.html',
})
export class AccountOpenPage {

  @ViewChild(Slides) slides: Slides;

  public country;
  
  public usStates: any;
  public usStatesNames = new Array();

  public canadaStates: any;
  public canadaStatesNames = new Array();

  public firstName; public lastName; public email; public ssn; public dob; public phone;
  public addr1; public addr2; public city; public state; public zip;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http) {
    this.http.get("assets/data/us_states.json").subscribe((data) => {
      this.usStates = data.json();
      for(let i=0; i<this.usStates.length; ++i) {
        this.usStatesNames[i] = this.usStates[i]["name"];
      }
      console.log(this.usStatesNames);
    });

    this.http.get("assets/data/canada_states.json").subscribe((data) => {
      this.canadaStates = data.json();
      for(let i=0; i<this.canadaStates.length; ++i) {
        this.canadaStatesNames[i] = this.canadaStates[i]["name"];
      }
      console.log(this.canadaStatesNames);
    });
  }

  public next() {
    this.slides.slideNext();
  }

  public editInfo(){
    this.slides.slideTo(0, 500);
  }

  public navigateAway(){

    let url = "http://10.236.128.48/AccountOpening/api/Account/NewAccountOpen"
    let headers = new Headers(
      {
        'Content-Type' : 'application/json'
      });
      let options = new RequestOptions({ headers: headers });
      
      let data = JSON.stringify({
        firstName: this.firstName,
        lastName: this.lastName,
        email:this.email,
        phone:this.phone,
        dob:"1982-09-17",
        homeAddress:"30 Park St, Boston, MA 02108",
        ssn:this.ssn,
        account:"brokerage",
        type:"individual"
      });
      
     
      this.http.post(url,data,options).subscribe( res => {
        let AccountDetails= res.json();

        setTimeout(()=>{
          this.navCtrl.push(CongratulatePage,{accountNumber:AccountDetails.AccountNumber});
        },2000);

      },
    err => {
      this.navCtrl.push(CongratulatePage,{accountNumber:'618208013'});
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountOpenPage');
  }

}
